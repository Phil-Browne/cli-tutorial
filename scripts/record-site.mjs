#!/usr/bin/env node
/**
 * record-site.mjs
 *
 * Records a walkthrough of the Megaport CLI tutorial site using Playwright,
 * producing one .webm video per page in scripts/recordings/.
 *
 * Usage:
 *   npx playwright install chromium   # one-time setup
 *   node scripts/record-site.mjs [BASE_URL]
 *
 * BASE_URL defaults to http://localhost:3000
 * Override: node scripts/record-site.mjs https://cli-tutorial.vercel.app
 */

import { chromium } from 'playwright'
import { mkdirSync, readdirSync, copyFileSync } from 'fs'
import { join, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const BASE_URL = process.argv[2] ?? 'http://localhost:3000'
const OUT_DIR = join(__dirname, 'recordings')

mkdirSync(OUT_DIR, { recursive: true })

// Pages to visit in order — (path, label, scroll behaviour)
const PAGES = [
  { path: '/',                                    label: '01-home',           scrollPause: 800 },
  { path: '/getting-started',                      label: '02-getting-started', scrollPause: 600 },
  { path: '/getting-started/authentication',      label: '03-authentication', scrollPause: 600 },
  { path: '/core-concepts/resource-types',        label: '04-resource-types', scrollPause: 600 },
  { path: '/tutorials',                           label: '05-tutorials-index',scrollPause: 500 },
  { path: '/tutorials/multi-cloud',               label: '06-multi-cloud',    scrollPause: 600 },
  { path: '/demos',                               label: '07-demos',          scrollPause: 1200 },
  { path: '/reference/command-reference',         label: '08-reference',      scrollPause: 600 },
]

async function scrollPage(page, pauseMs) {
  // Scroll slowly from top to bottom, pausing at each step
  await page.evaluate(async (pause) => {
    const total = document.body.scrollHeight
    const step = Math.max(300, Math.floor(total / 12))
    for (let y = 0; y < total; y += step) {
      window.scrollTo({ top: y, behavior: 'smooth' })
      await new Promise(r => setTimeout(r, pause))
    }
    // Brief pause at bottom
    await new Promise(r => setTimeout(r, pause * 1.5))
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
    await new Promise(r => setTimeout(r, 400))
  }, pauseMs)
}

async function recordPage(browser, { path, label, scrollPause }) {
  // Each page gets its own browser context so Playwright creates a separate video file
  const videoDir = join(OUT_DIR, `tmp-${label}`)
  mkdirSync(videoDir, { recursive: true })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    video: {
      dir: videoDir,
      size: { width: 1440, height: 900 },
    },
  })

  const page = await context.newPage()

  const url = `${BASE_URL}${path}`
  console.log(`  → ${label}: ${url}`)

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
  } catch {
    // networkidle can time out on pages with long-polling; fall back to domcontentloaded
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15_000 })
    await page.waitForTimeout(2000)
  }

  // Let the page settle before scrolling
  await page.waitForTimeout(800)
  await scrollPage(page, scrollPause)

  // Close context — this finalises the video file
  await context.close()

  // Move the video out of the temp dir with the label name
  const files = readdirSync(videoDir).filter(f => f.endsWith('.webm'))
  if (files.length === 0) {
    console.warn(`    ⚠ No video written for ${label}`)
    return null
  }
  const src = join(videoDir, files[0])
  const dest = join(OUT_DIR, `${label}.webm`)
  copyFileSync(src, dest)
  console.log(`    ✓ Saved ${basename(dest)}`)
  return dest
}

async function main() {
  console.log(`\n🎬 Recording ${PAGES.length} pages from ${BASE_URL}\n`)

  const browser = await chromium.launch({ headless: true })

  const saved = []
  for (const page of PAGES) {
    const dest = await recordPage(browser, page)
    if (dest) saved.push(dest)
  }

  await browser.close()

  console.log(`\n✅ Done — ${saved.length} recordings in ${OUT_DIR}/`)
  console.log('\nFiles:')
  saved.forEach(f => console.log(`  ${basename(f)}`))
  console.log('\nNext step:')
  console.log('  GEMINI_API_KEY=<your-key> node scripts/gemini-review.mjs\n')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
