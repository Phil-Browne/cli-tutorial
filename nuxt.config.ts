// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Client-side only rendering — WASM requires browser context
  ssr: false,

  modules: ['@nuxt/content', '@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'vercel',
    // COOP/COEP headers required for Go WASM SharedArrayBuffer support
    routeRules: {
      '/**': {
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp',
        },
      },
    },
  },

  // Dev server also needs COOP/COEP headers
  vite: {
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
    },
    // Prevent Vite from trying to process .wasm as assets
    assetsInclude: ['**/*.wasm'],
  },

  content: {
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
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Megaport CLI — Tutorials, Live Demo & Reference' },
        { name: 'twitter:description', content: 'Learn to manage Megaport network infrastructure with the CLI — tutorials, live demos, and reference docs for Solutions Architects and Sales teams.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
