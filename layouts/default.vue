<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
    <!-- Skip to content -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
    >
      Skip to content
    </a>

    <!-- ── Header ── -->
    <header class="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm">
      <div class="flex items-center justify-between px-4 lg:px-6 h-14">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <!-- Mobile: hamburger -->
          <button
            class="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Open navigation"
            @click="sidebarOpen = true"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <NuxtLink to="/" class="flex items-center gap-2.5 group">
            <div
              class="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
              style="background-color: #6B2D8B;"
            >
              <span class="text-white font-bold text-xs" aria-hidden="true">M</span>
            </div>
            <span class="font-semibold text-white group-hover:text-violet-400 transition-colors text-sm">
              Megaport CLI
            </span>
          </NuxtLink>
        </div>

        <!-- Center nav (desktop) -->
        <nav class="hidden md:flex items-center gap-1" role="navigation" aria-label="Main">
          <NuxtLink
            v-for="link in headerLinks"
            :key="link.to"
            :to="link.to"
            class="px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            active-class="text-white bg-gray-800"
            :aria-current="$route.path.startsWith(link.to) ? 'page' : undefined"
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
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <kbd class="hidden md:inline-block text-xs text-gray-500 border border-gray-700 rounded px-1 font-mono">⌘K</kbd>
          </button>


          <!-- Try Live Demo CTA -->
          <NuxtLink
            to="/demos"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-colors"
            style="background-color: #6B2D8B;"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Try Live Demo
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- ── Mobile sidebar drawer ── -->
    <USlideover v-model="sidebarOpen" side="left">
      <div class="flex flex-col max-h-screen bg-gray-950 pt-4">
        <div class="flex items-center justify-between px-4 mb-4 shrink-0">
          <span class="font-semibold text-white">Navigation</span>
          <button
            class="p-1 rounded text-gray-400 hover:text-white"
            aria-label="Close navigation"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto px-3 pb-6">
          <SidebarNav :navigation="navigation" @navigate="sidebarOpen = false" />
        </div>
      </div>
    </USlideover>

    <!-- ── Body ── -->
    <div class="flex flex-1">
      <!-- Desktop sidebar -->
      <aside class="w-64 shrink-0 hidden lg:flex flex-col border-r border-gray-800 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-5" role="navigation" aria-label="Sidebar">
        <div class="px-3">
          <SidebarNav :navigation="navigation" />
        </div>
      </aside>

      <!-- Main content -->
      <main id="main-content" class="flex-1 min-w-0 px-6 py-8 lg:py-10">
        <Breadcrumbs />
        <slot />
      </main>
    </div>

    <!-- ── Footer ── -->
    <footer class="border-t border-gray-800 bg-gray-950 py-6 px-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
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
            href="https://docs.megaport.com/"
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

    <!-- Search modal -->
    <SearchModal v-model="searchOpen" />
  </div>
</template>

<script setup lang="ts">
const sidebarOpen = ref(false)
const searchOpen = ref(false)
const colorMode = useColorMode()

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

const headerLinks = useHeaderLinks()

// Build navigation tree from content queries (more reliable than fetchContentNavigation with ssr:false)
const { data: navigation } = useLazyAsyncData('navigation', async () => {
  const allPages = await queryContent()
    .where({ _partial: { $ne: true } })
    .only(['title', 'description', '_path', '_file'])
    .sort({ _file: 1 })
    .find()

  // Group pages into sections by top-level path segment
  const sections: Record<string, { title: string; _path: string; children: { title: string; _path: string }[] }> = {}

  for (const page of allPages) {
    const parts = page._path?.split('/').filter(Boolean) ?? []
    if (parts.length === 0) continue

    const sectionPath = `/${parts[0]}`

    if (!sections[sectionPath]) {
      sections[sectionPath] = { title: '', _path: sectionPath, children: [] }
    }

    if (parts.length === 1) {
      // Section index page — use its title as the section header
      sections[sectionPath].title = page.title || parts[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Untitled'
    } else {
      // Child page
      sections[sectionPath].children.push({ title: page.title ?? parts[parts.length - 1], _path: page._path! })
    }
  }

  return Object.values(sections)
})
</script>
