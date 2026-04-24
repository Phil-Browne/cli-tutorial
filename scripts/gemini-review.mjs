#!/usr/bin/env node
/**
 * gemini-review.mjs
 *
 * Uploads the recorded .webm files to the Gemini Files API and requests
 * a structured UI/UX review, then writes the report to scripts/gemini-report.md
 *
 * Usage:
 *   GEMINI_API_KEY=<your-key> node scripts/gemini-review.mjs [--recordings-dir <path>]
 *
 * Options:
 *   --recordings-dir  Path to recordings directory (default: scripts/recordings)
 *   --model           Gemini model (default: gemini-2.0-flash)
 *   --limit           Max number of recordings to send (default: 8)
 *   --dry-run         List files and exit without calling Gemini
 */

import { readFileSync, readdirSync, writeFileSync, statSync } from 'fs'
import { join, basename, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const flag = (name, def) => {
  const i = args.indexOf(name)
  return i !== -1 ? args[i + 1] : def
}

const RECORDINGS_DIR = resolve(flag('--recordings-dir', join(__dirname, 'recordings')))
const MODEL          = flag('--model', 'gemini-2.0-flash')
const LIMIT          = parseInt(flag('--limit', '8'), 10)
const DRY_RUN        = args.includes('--dry-run')
const API_KEY        = process.env.GEMINI_API_KEY

if (!API_KEY && !DRY_RUN) {
  console.error('❌  GEMINI_API_KEY environment variable is required.\n')
  console.error('    export GEMINI_API_KEY=your_key && node scripts/gemini-review.mjs\n')
  process.exit(1)
}

const BASE = 'https://generativelanguage.googleapis.com'

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatBytes(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 ** 2).toFixed(1)} MB`
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// ── Upload a single file to the Gemini Files API ──────────────────────────────
async function uploadFile(filePath) {
  const data = readFileSync(filePath)
  const name = basename(filePath)
  const size = data.byteLength

  console.log(`  ↑ Uploading ${name} (${formatBytes(size)})…`)

  // Step 1 — initiate resumable upload
  const initRes = await fetch(
    `${BASE}/upload/v1beta/files?uploadType=resumable&key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': String(size),
        'X-Goog-Upload-Header-Content-Type': 'video/webm',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file: { display_name: name } }),
    }
  )

  if (!initRes.ok) {
    const text = await initRes.text()
    throw new Error(`Upload init failed for ${name}: ${initRes.status} ${text}`)
  }

  const uploadUrl = initRes.headers.get('x-goog-upload-url')
  if (!uploadUrl) throw new Error(`No upload URL returned for ${name}`)

  // Step 2 — upload the bytes
  const uploadRes = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Length': String(size),
      'X-Goog-Upload-Offset': '0',
      'X-Goog-Upload-Command': 'upload, finalize',
    },
    body: data,
  })

  if (!uploadRes.ok) {
    const text = await uploadRes.text()
    throw new Error(`Upload failed for ${name}: ${uploadRes.status} ${text}`)
  }

  const json = await uploadRes.json()
  const fileUri = json.file?.uri
  const fileState = json.file?.state

  if (!fileUri) throw new Error(`No file URI returned for ${name}`)

  console.log(`    ✓ Uploaded: ${fileUri} (state: ${fileState})`)
  return { uri: fileUri, name, state: fileState }
}

// ── Poll until all files are ACTIVE ──────────────────────────────────────────
async function waitForFiles(files) {
  const pending = files.filter(f => f.state !== 'ACTIVE')
  if (pending.length === 0) return files

  console.log(`\n  ⏳ Waiting for ${pending.length} file(s) to process…`)

  for (let attempt = 0; attempt < 30; attempt++) {
    await sleep(4000)
    const updated = await Promise.all(
      files.map(async f => {
        if (f.state === 'ACTIVE') return f
        const name = f.uri.split('/').pop()
        const res = await fetch(`${BASE}/v1beta/files/${name}?key=${API_KEY}`)
        const json = await res.json()
        return { ...f, state: json.file?.state ?? f.state }
      })
    )

    const stillPending = updated.filter(f => f.state !== 'ACTIVE')
    if (stillPending.length === 0) {
      console.log('    ✓ All files ACTIVE')
      return updated
    }
    process.stdout.write(`    … ${stillPending.length} still processing\r`)
  }

  throw new Error('Files did not become ACTIVE within the timeout')
}

// ── Build the Gemini prompt ───────────────────────────────────────────────────
const REVIEW_PROMPT = `
You are a senior UI/UX designer and front-end engineer reviewing a technical documentation site.
The site is the "Megaport CLI Tutorial" — a dark-themed, developer-focused site built with Nuxt 3.
You have been given screen recordings of ${LIMIT} pages.

Please provide a structured review covering:

## 1. Visual Design
- Colour palette consistency and contrast ratios (WCAG AA minimum)
- Typography hierarchy — headings, body, code blocks
- Spacing and layout rhythm
- Dark mode implementation quality

## 2. Navigation & Information Architecture
- Header / sidebar navigation clarity
- Active page indication
- Breadcrumb / "you are here" signals
- Prev/Next navigation between tutorial pages
- Table of contents usability

## 3. Content Presentation
- Code block readability and syntax highlighting
- Callout / info card design
- Tables and lists formatting
- Step-by-step instruction clarity

## 4. Interactive Elements
- Button and link affordance
- Search modal (if visible)
- Demo terminal widget
- Hover and focus states

## 5. Mobile / Responsive
- Based on what you can see, flag any obvious responsive concerns

## 6. Performance Signals
- Any visible layout shift or flash of unstyled content
- Image / asset loading

## 7. Prioritised Issues
List the top 5 issues ordered by impact, with:
- **Issue**: what is wrong
- **Page**: which page(s)
- **Why it matters**: user impact
- **Suggested fix**: specific, actionable recommendation

## 8. Positives
What is done well that should be preserved.

Be specific and reference timestamps (e.g. "at 0:12 on page 02-introduction") where relevant.
Output valid Markdown suitable for pasting into a GitHub issue or Notion doc.
`.trim()

// ── Call Gemini generateContent ───────────────────────────────────────────────
async function callGemini(uploadedFiles) {
  console.log(`\n🤖 Sending ${uploadedFiles.length} videos to ${MODEL}…`)

  const videoParts = uploadedFiles.map(f => ({
    fileData: { mimeType: 'video/webm', fileUri: f.uri },
  }))

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          ...videoParts,
          { text: REVIEW_PROMPT },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 8192,
    },
  }

  const res = await fetch(
    `${BASE}/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Gemini API error ${res.status}: ${text}`)
  }

  const json = await res.json()
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    console.error('Unexpected response:', JSON.stringify(json, null, 2))
    throw new Error('No text in Gemini response')
  }

  return text
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // Find recordings
  let recordings
  try {
    recordings = readdirSync(RECORDINGS_DIR)
      .filter(f => f.endsWith('.webm'))
      .sort()
      .slice(0, LIMIT)
      .map(f => join(RECORDINGS_DIR, f))
  } catch {
    console.error(`❌  Could not read recordings directory: ${RECORDINGS_DIR}`)
    console.error('    Run record-site.mjs first.\n')
    process.exit(1)
  }

  if (recordings.length === 0) {
    console.error(`❌  No .webm files found in ${RECORDINGS_DIR}`)
    console.error('    Run record-site.mjs first.\n')
    process.exit(1)
  }

  console.log(`\n📁 Found ${recordings.length} recording(s):`)
  recordings.forEach(f => {
    const { size } = statSync(f)
    console.log(`   ${basename(f)}  (${formatBytes(size)})`)
  })

  if (DRY_RUN) {
    console.log('\n--dry-run: exiting before upload.\n')
    return
  }

  // Upload all files
  console.log('\n📤 Uploading to Gemini Files API…')
  const uploaded = []
  for (const rec of recordings) {
    const result = await uploadFile(rec)
    uploaded.push(result)
  }

  // Wait for processing
  const active = await waitForFiles(uploaded)

  // Call Gemini
  const report = await callGemini(active)

  // Write report
  const reportPath = join(__dirname, 'gemini-report.md')
  const header = `# Gemini UI Review — Megaport CLI Tutorial\n\n_Generated ${new Date().toISOString()} by ${MODEL}_\n\n---\n\n`
  writeFileSync(reportPath, header + report)

  console.log(`\n✅ Report written to ${reportPath}\n`)
  console.log('─'.repeat(60))
  console.log(report.slice(0, 800) + (report.length > 800 ? '\n…(truncated, see file)' : ''))
  console.log('─'.repeat(60))
}

main().catch(err => {
  console.error('\n❌', err.message)
  process.exit(1)
})
