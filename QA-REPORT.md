# QA Report — Megaport CLI Tutorial

**Date:** 2026-04-02
**Branch:** main
**Site:** https://cli-tutorial.megaport.com

---

## CLI Command Validation

**Tool:** `node scripts/validate-commands.mjs`

**Result:** 68 valid, 0 invalid (68 unique subcommand paths checked across 24 markdown files)

**Issues found and fixed:**

| Invalid Command | Files | Fix Applied |
|---|---|---|
| `megaport-cli status` | `getting-started/4.first-commands.md`, `tutorials/5.multi-cloud.md`, `tutorials/6.automation.md`, `demos/1.browser-terminal.md`, `reference/1.command-reference.md`, `reference/3.troubleshooting.md` | Replaced with per-resource commands (`ports list`, `vxc list`, `mcr list`) |
| `megaport-cli ix list` | `core-concepts/1.resource-types.md`, `reference/1.command-reference.md` | Removed code block (IX has no CLI subcommand; manage via portal) |
| `megaport-cli ix buy` | `core-concepts/1.resource-types.md`, `reference/1.command-reference.md` | Removed code block |
| `megaport-cli users list` | `reference/1.command-reference.md` | Removed code block (no `users` subcommand in CLI) |
| `megaport-cli users activity` | `reference/1.command-reference.md` | Removed code block |

All 5 invalid commands were removed or corrected. Re-run confirms 0 failures.

---

## Component Tests

**Tool:** `npm test` (Vitest 4.1.2 + @nuxt/test-utils 4.0.0)

**Result:** 14 passed, 0 failed (3 test files)

| Test File | Tests | Result |
|---|---|---|
| `tests/components/AudienceToggle.test.ts` | 3 | ✅ Pass |
| `tests/components/CommandExample.test.ts` | 5 | ✅ Pass |
| `tests/components/CodeBlock.test.ts` | 6 | ✅ Pass |

**Coverage highlights:**
- `AudienceToggle`: button rendering, default SA selection, click-to-switch
- `CommandExample`: prop rendering (command, description, output), clipboard copy
- `CodeBlock`: single/tabs mode, tab switching, language badge, clipboard copy

---

## Build Verification

`npx nuxi build` — ✅ succeeds, no TypeScript or Vite errors.

---

## Content Issues Found

| Issue | Location | Status |
|---|---|---|
| 5 non-existent CLI commands documented | Multiple content files | ✅ Fixed |
| `ix` and `users` conceptual sections retained | `reference/1.command-reference.md` | Kept — describes portal-managed features |
| No TODO/placeholder text found | All content | ✅ Clean |

---

## Cross-Browser Testing

See `docs/cross-browser-testing.md` for the full manual QA checklist.

**Key browser notes:**
- WASM (SharedArrayBuffer) requires COOP/COEP headers — verified present in `nuxt.config.ts` routeRules and emitted to `.vercel/output/config.json`
- Safari does not support SharedArrayBuffer without COOP/COEP — demo terminal requires Chrome or Firefox on Safari < 15.2
- Mobile terminal usability is limited by virtual keyboard obscuring the terminal; acceptable for the current use case (desktop-first)

---

## Known Issues / Deferred

| Issue | Severity | Notes |
|---|---|---|
| `ix` and `users` sections in reference docs describe portal-only features | Low | Documented as portal-managed; no fix needed |
| Mobile terminal keyboard UX | Low | Virtual keyboard overlaps terminal; acceptable for demo use case |
| WASM not testable in Vitest (Node.js environment) | Low | Integration tests require a browser; no automated coverage for terminal commands |
| Vitest deprecation warning from `@nuxt/test-utils` importing `vitest/environments` | Info | Upstream issue in `@nuxt/test-utils@4.0.0`; no impact on test results |
