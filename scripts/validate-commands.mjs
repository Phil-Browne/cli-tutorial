#!/usr/bin/env node
/**
 * CLI Command Validator
 *
 * Extracts megaport-cli commands from markdown content files and validates
 * each command exists by running `megaport-cli <subcommand> --help`.
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const CONTENT_DIR = join(__dirname, '..', 'content')

// ── Helpers ────────────────────────────────────────────────────────────────

function walkDir(dir) {
  const results = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      results.push(...walkDir(full))
    } else if (extname(full) === '.md') {
      results.push(full)
    }
  }
  return results
}

/**
 * Extract bash/shell code block contents from markdown.
 * Returns array of { file, lineStart, lines }
 */
function extractCodeBlocks(file) {
  const content = readFileSync(file, 'utf8')
  const lines = content.split('\n')
  const blocks = []
  let inBlock = false
  let isBash = false
  let blockLines = []
  let lineStart = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!inBlock) {
      if (/^```(bash|shell|sh)\s*$/.test(line.trim())) {
        inBlock = true
        isBash = true
        blockLines = []
        lineStart = i + 1
      }
    } else {
      if (line.trim() === '```') {
        if (isBash) blocks.push({ file, lineStart, lines: blockLines })
        inBlock = false
        isBash = false
      } else {
        blockLines.push({ text: line, lineNum: i + 1 })
      }
    }
  }
  return blocks
}

/**
 * Parse a single command line and return the subcommand path array,
 * or null if it's not a megaport-cli command.
 *
 * e.g. "$ megaport-cli ports list --output table" → ['ports', 'list']
 *      "megaport ports get <portUID>"              → ['ports', 'get']
 */
function parseCommandPath(line) {
  // Strip leading prompt, comments, env vars
  let text = line.trim()
  if (text.startsWith('#')) return null
  text = text.replace(/^\$\s+/, '')
  text = text.replace(/^export\s+\w+=\S+\s*/, '')

  const match = text.match(/^megaport(?:-cli)?\s+(.+)/)
  if (!match) return null

  const rest = match[1].trim()
  const tokens = rest.split(/\s+/)

  // Collect subcommand tokens (stop at flags, placeholders, or pipe)
  const subTokens = []
  for (const token of tokens) {
    if (token.startsWith('-') || token.startsWith('<') || token.startsWith('[') || token === '|' || token === '>' || token.startsWith('/')) break
    // Strip trailing argument placeholders in bracket forms
    if (/^[a-z][a-z0-9-]*$/.test(token)) {
      subTokens.push(token)
    } else {
      break
    }
  }

  return subTokens.length > 0 ? subTokens : null
}

/**
 * Validate that `megaport-cli <subcommand path> --help` exits 0.
 */
function validateCommand(subPath) {
  const cmd = `megaport-cli ${subPath.join(' ')} --help`
  try {
    execSync(cmd, { stdio: 'pipe', timeout: 5000 })
    return true
  } catch {
    return false
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

const files = walkDir(CONTENT_DIR)
console.log(`Scanning ${files.length} markdown files in content/...\n`)

// Map: command key → array of { file, lineNum }
const commandMap = new Map()

for (const file of files) {
  const blocks = extractCodeBlocks(file)
  for (const block of blocks) {
    for (const { text, lineNum } of block.lines) {
      const path = parseCommandPath(text)
      if (!path) continue
      const key = path.join(' ')
      if (!commandMap.has(key)) commandMap.set(key, [])
      commandMap.get(key).push({ file: file.replace(CONTENT_DIR + '/', ''), lineNum })
    }
  }
}

const commands = [...commandMap.entries()]
console.log(`Found ${commands.length} unique subcommand paths to validate.\n`)

let passed = 0
let failed = 0
const failures = []

for (const [key, refs] of commands) {
  const ok = validateCommand(key.split(' '))
  if (ok) {
    console.log(`  ✅  megaport-cli ${key}`)
    passed++
  } else {
    const ref = refs[0]
    console.log(`  ❌  megaport-cli ${key}`)
    console.log(`      Referenced in: ${ref.file}:${ref.lineNum}`)
    failures.push({ key, refs })
    failed++
  }
}

console.log(`\n${'─'.repeat(60)}`)
console.log(`Summary: ${passed} valid, ${failed} invalid (${commands.length} total)`)

if (failures.length > 0) {
  console.log('\nFailed commands:')
  for (const { key, refs } of failures) {
    console.log(`  megaport-cli ${key}`)
    for (const { file, lineNum } of refs) {
      console.log(`    → ${file}:${lineNum}`)
    }
  }
  process.exit(1)
} else {
  console.log('\nAll commands validated successfully.')
}
