<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
    <!-- Skip to content -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
    >
      Skip to content
    </a>

    <!-- ── Header (same as default) ── -->
    <header class="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm">
      <div class="flex items-center justify-between px-4 lg:px-8 h-14">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div
            class="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style="background-color: #6B2D8B;"
          >
            <span class="text-white font-bold text-xs">M</span>
          </div>
          <span class="font-semibold text-white group-hover:text-violet-400 transition-colors text-sm">
            Megaport CLI
          </span>
          <span class="text-gray-600 text-sm hidden sm:inline">Tutorial</span>
        </NuxtLink>

        <!-- Center nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in headerLinks"
            :key="link.to"
            :to="link.to"
            class="px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            active-class="text-white bg-gray-800"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Right: search + dark mode + CTA -->
        <div class="flex items-center gap-2">
          <!-- Search button -->
          <button
            class="flex items-center gap-1.5 p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Search (⌘K)"
            @click="searchOpen = true"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <kbd class="hidden md:inline-block text-xs text-gray-500 border border-gray-700 rounded px-1 font-mono">⌘K</kbd>
          </button>

          <button
            class="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleColorMode"
          >
            <svg v-if="colorMode.value === 'dark'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <NuxtLink
            to="/getting-started"
            class="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-colors"
            style="background-color: #6B2D8B;"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- ── Full-width content ── -->
    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <!-- Search modal -->
    <SearchModal v-model="searchOpen" />

    <!-- ── Footer ── -->
    <footer class="border-t border-gray-800 bg-gray-950 py-6 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <span>© {{ new Date().getFullYear() }} Megaport. All rights reserved.</span>
        <div class="flex items-center gap-4">
          <a
            href="https://github.com/megaport/megaport-cli"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-gray-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.megaport.com/documentation/"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-gray-300 transition-colors"
          >
            Docs
          </a>
          <span class="text-gray-600">Powered by Megaport CLI WASM</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const searchOpen = ref(false)

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      searchOpen.value = true
    }
  })
})

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const headerLinks = [
  { to: '/getting-started', label: 'Get Started' },
  { to: '/core-concepts', label: 'Concepts' },
  { to: '/tutorials', label: 'Tutorials' },
  { to: '/demos', label: 'Live Demo' },
  { to: '/reference', label: 'Reference' },
]
</script>
