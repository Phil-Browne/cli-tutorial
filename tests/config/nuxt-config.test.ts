import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Parse all CSP strings from nuxt.config.ts to validate security headers.
 * This avoids importing the Nuxt config (which requires the full Nuxt context)
 * by extracting CSP values directly from the source.
 */
function loadNuxtConfigSource(): string {
  return readFileSync(resolve(__dirname, '../../nuxt.config.ts'), 'utf-8')
}

function extractCSPDirectives(csp: string): Record<string, string[]> {
  const directives: Record<string, string[]> = {}
  for (const part of csp.split(';')) {
    const tokens = part.trim().split(/\s+/)
    if (tokens.length > 0) {
      directives[tokens[0]] = tokens.slice(1)
    }
  }
  return directives
}

function extractAllCSPStrings(source: string): string[] {
  const matches = [...source.matchAll(/'Content-Security-Policy':\s*"([^"]+)"/g)]
  return matches.map((m) => m[1])
}

describe('nuxt.config.ts — security headers', () => {
  const source = loadNuxtConfigSource()
  const cspStrings = extractAllCSPStrings(source)

  it('should have at least two CSP definitions (production + dev)', () => {
    expect(cspStrings.length).toBeGreaterThanOrEqual(2)
  })

  describe.each(
    cspStrings.map((csp, i) => ({ label: i === 0 ? 'production' : 'dev', csp })),
  )('$label CSP', ({ csp }) => {
    const directives = extractCSPDirectives(csp)

    it('connect-src allows https://api.megaport.com for WASM CLI API calls', () => {
      expect(directives['connect-src']).toContain('https://api.megaport.com')
    })

    it('connect-src allows https://api-staging.megaport.com for staging environment', () => {
      expect(directives['connect-src']).toContain('https://api-staging.megaport.com')
    })

    it('connect-src allows https://api.github.com', () => {
      expect(directives['connect-src']).toContain('https://api.github.com')
    })

    it('script-src allows wasm-unsafe-eval for Go WASM execution', () => {
      expect(directives['script-src']).toContain("'wasm-unsafe-eval'")
    })

    it('worker-src allows blob: for WASM worker threads', () => {
      expect(directives['worker-src']).toContain('blob:')
    })
  })

  describe('COOP/COEP headers for SharedArrayBuffer', () => {
    it('production sets Cross-Origin-Opener-Policy: same-origin', () => {
      expect(source).toContain("'Cross-Origin-Opener-Policy': 'same-origin'")
    })

    it('production sets Cross-Origin-Embedder-Policy: credentialless', () => {
      expect(source).toContain("'Cross-Origin-Embedder-Policy': 'credentialless'")
    })
  })

  describe('demo route rules', () => {
    it('disables SSR for /demos/** routes', () => {
      expect(source).toMatch(/['"]\/demos\/\*\*['"]\s*:\s*\{\s*ssr\s*:\s*false\s*\}/)
    })
  })
})
