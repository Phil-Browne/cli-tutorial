# Cross-Browser Testing Checklist

Manual QA checklist for the Megaport CLI Tutorial site. Test each item in every browser before a production release.

## Browsers

- [ ] **Chrome** (latest stable)
- [ ] **Firefox** (latest stable)
- [ ] **Safari** (latest, macOS)
- [ ] **Edge** (latest stable)
- [ ] **Mobile Safari** (iOS 17+)
- [ ] **Mobile Chrome** (Android 14+)

---

## Core Navigation

| Check | Chrome | Firefox | Safari | Edge | Mobile Safari | Mobile Chrome |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Home page loads without errors | | | | | | |
| Desktop sidebar renders and links work | | | | | | |
| Mobile hamburger opens/closes drawer | | | | | | |
| Header nav links navigate correctly | | | | | | |
| Breadcrumbs show correct path | | | | | | |
| Page transitions (fade) are smooth | | | | | | |
| Footer links open in new tab | | | | | | |

---

## Search

| Check | Chrome | Firefox | Safari | Edge | Mobile Safari | Mobile Chrome |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Cmd+K (Mac) / Ctrl+K (Win/Linux) opens modal | | | | | | |
| Search button in header opens modal | | | | | | |
| Typing returns relevant results | | | | | | |
| Up/down arrow key navigation works | | | | | | |
| Enter key navigates to selected result | | | | | | |
| Escape key closes modal | | | | | | |
| Recent searches shown when query is empty | | | | | | |
| Clicking backdrop closes modal | | | | | | |

---

## Accessibility

| Check | Chrome | Firefox | Safari | Edge |
|---|:---:|:---:|:---:|:---:|
| Tab key reveals skip-to-content link | | | | |
| Skip-to-content link jumps to main content | | | | |
| Focus rings visible on all interactive elements | | | | |
| Dark/light mode toggle works | | | | |
| Dark mode preference persists across reload | | | | |
| `prefers-reduced-motion`: animations disabled | | | | |

---

## Content & Components

| Check | Chrome | Firefox | Safari | Edge | Mobile Safari | Mobile Chrome |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Code blocks render with syntax highlighting | | | | | | |
| Copy button copies correct text to clipboard | | | | | | |
| Multi-tab code blocks switch content | | | | | | |
| Mermaid diagrams render (not blank) | | | | | | |
| Info cards display with correct colour (tip/note/warning) | | | | | | |
| Audience toggle switches between SA/Sales views | | | | | | |
| Step progress indicator renders | | | | | | |
| Tables scroll horizontally at narrow widths | | | | | | |
| Scroll-reveal animations trigger on homepage sections | | | | | | |
| Feature card hover lift effect (desktop) | | | | | | |

---

## Demos

| Check | Chrome | Firefox | Safari | Edge | Mobile Safari | Mobile Chrome |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `/demos` page loads | | | | | | |
| WASM terminal auth form accepts credentials | | | | | | |
| Connect shows skeleton loader then terminal | | | | | | |
| Terminal accepts and runs commands | | | | | | |
| Disconnect button returns to auth form | | | | | | |
| Guided demo scripts render and copy works | | | | | | |
| Terminal keyboard input works on mobile | | | | | | |

---

## Error Handling

| Check | Chrome | Firefox | Safari | Edge |
|---|:---:|:---:|:---:|:---:|
| `/nonexistent-page` shows branded 404 page | | | | |
| 404 quick-nav links work | | | | |
| "Back to home" button on 404 works | | | | |

---

## Performance (Desktop Chrome)

Run against the production URL or local `nuxi generate` output.

| Metric | Target | Actual |
|---|---|---|
| Lighthouse Performance | > 90 | |
| Lighthouse Accessibility | > 95 | |
| Lighthouse Best Practices | > 95 | |
| Lighthouse SEO | > 95 | |
| LCP (Largest Contentful Paint) | < 2.5s | |
| CLS (Cumulative Layout Shift) | < 0.1 | |

---

## WASM-Specific (Chrome + Firefox only for SharedArrayBuffer)

| Check | Chrome | Firefox |
|---|:---:|:---:|
| `Cross-Origin-Opener-Policy: same-origin` header present | | |
| `Cross-Origin-Embedder-Policy: require-corp` header present | | |
| WASM binary loads (no console errors about SharedArrayBuffer) | | |
| Multiple command executions don't degrade performance | | |

---

## Notes

Record any browser-specific issues here:

| Browser | Issue | Severity | Fixed? |
|---|---|---|---|
| | | | |
