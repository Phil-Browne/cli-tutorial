# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive tutorial and documentation site for the Megaport CLI. Built with Nuxt 3 + Vue 3 + TypeScript. Features a browser-based terminal emulator powered by Go WASM that runs the actual Megaport CLI in the browser.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (Vercel target)
npm run generate     # Pre-render static site
npm run preview      # Preview production build
npm test             # Run tests (vitest run)
npm run test:watch   # Tests in watch mode
```

Utility scripts in `scripts/`:
- `node scripts/validate-commands.mjs` — validates CLI commands referenced in markdown content

## Architecture

**Content-driven routing:** All tutorial/docs pages are markdown files in `content/` rendered via `pages/[...slug].vue`. Directory numbering (0.getting-started, 1.core-concepts, etc.) controls navigation order.

**WASM terminal:** The browser terminal uses xterm.js with a Go WASM backend (`composables/useMegaportWASM.ts`). Demo pages under `/demos/**` are rendered client-side only (SSR disabled in nuxt.config.ts route rules) because WASM requires SharedArrayBuffer, which needs COOP/COEP headers.

**Components:** Auto-registered globally (no prefix), organized by category: `components/ui/`, `components/demo/`, `components/content/`, `components/tutorial/`.

**Layouts:** `default.vue` (sidebar nav for docs) and `landing.vue` (homepage).

## Key Technical Details

- **Node.js >= 22** required (see `engines` in package.json)
- **COOP/COEP headers** configured in `nuxt.config.ts` for SharedArrayBuffer support — do not remove these
- **Deployment:** Vercel (nitro preset: 'vercel')
- **Testing:** Vitest with Nuxt environment and happy-dom; SSR disabled in test config. WASM features cannot be tested in Vitest (requires real browser)
- **Styling:** Tailwind CSS with Megaport brand colors defined in `tailwind.config.ts`
