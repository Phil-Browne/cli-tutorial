// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // SSR enabled for content pages; demo pages opt out (WASM requires browser context)
  ssr: true,

  modules: ['@nuxt/content', '@nuxt/ui'],

  // Register components by filename only — no directory prefix (e.g. SidebarNav, not UiSidebarNav)
  components: [
    { path: '~/components', pathPrefix: false, global: true },
  ],

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'vercel',
    routeRules: {
      // WASM requires browser context — render demos client-side only
      '/demos/**': { ssr: false },
      // COOP/COEP headers required for Go WASM SharedArrayBuffer support
      // CSP restricts resource loading to trusted origins
      '/**': {
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'credentialless',
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://plausible.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.megaport.com https://api-staging.megaport.com https://auth-m2m.megaport.com https://auth-m2m-staging.megaport.com https://api.github.com https://plausible.io; img-src 'self' data:; worker-src 'self' blob:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
        },
      },
    },
  },

  // Dev server also needs COOP/COEP headers (relaxed CSP for HMR/devtools WebSocket)
  vite: {
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'credentialless',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' ws: wss: https://api.megaport.com https://api-staging.megaport.com https://auth-m2m.megaport.com https://auth-m2m-staging.megaport.com https://api.github.com https://plausible.io; img-src 'self' data:; worker-src 'self' blob:; object-src 'none'",
      },
    },
    // Prevent Vite from trying to process .wasm as assets
    assetsInclude: ['**/*.wasm'],
  },

  content: {
    navigation: {
      fields: ['description', 'icon'],
    },
    highlight: {
      theme: 'github-dark',
      langs: ['go', 'bash', 'json', 'yaml', 'typescript', 'vue'],
    },
  },

  ui: {
    global: true,
  },

  // Extend Tailwind theme with Megaport brand colors
  // @nuxt/ui uses app.config.ts for theme colors
  app: {
    head: {
      title: 'Megaport CLI — Tutorials, Live Demo & Reference',
      meta: [
        { name: 'description', content: 'Learn to manage Megaport network infrastructure with the CLI — tutorials, live demos, and reference docs for Solutions Architects and Sales teams.' },
        // Open Graph
        { property: 'og:title', content: 'Megaport CLI — Tutorials, Live Demo & Reference' },
        { property: 'og:description', content: 'Learn to manage Megaport network infrastructure with the CLI — tutorials, live demos, and reference docs for Solutions Architects and Sales teams.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://cli-tutorial.megaport.com/images/megaport-og.png' },
        { property: 'og:image:width', content: '2917' },
        { property: 'og:image:height', content: '692' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Megaport CLI — Tutorials, Live Demo & Reference' },
        { name: 'twitter:description', content: 'Learn to manage Megaport network infrastructure with the CLI — tutorials, live demos, and reference docs for Solutions Architects and Sales teams.' },
        { name: 'twitter:image', content: 'https://cli-tutorial.megaport.com/images/megaport-og.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/megaport-icon-red.png' },
        { rel: 'apple-touch-icon', href: '/images/megaport-icon-red.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap' },
      ],
      // Plausible analytics — opt-in via NUXT_PUBLIC_PLAUSIBLE_DOMAIN env var
      ...(process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN ? {
        script: [
          {
            src: 'https://plausible.io/js/script.js',
            defer: true,
            'data-domain': process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
          },
        ],
      } : {}),
    },
  },
})
