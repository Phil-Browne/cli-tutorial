import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        megaport: {
          purple: {
            DEFAULT: '#6B2D8B',
            light: '#9B5DBB',
            dark: '#4A1D62',
          },
          navy: {
            DEFAULT: '#1A1A2E',
            light: '#2A2A4E',
          },
          teal: {
            DEFAULT: '#00BCD4',
            light: '#4DD0E1',
            dark: '#00838F',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
} satisfies Config
