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
    <header
      class="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm"
    >
      <div class="flex items-center justify-between px-4 lg:px-8 h-14">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div
            class="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style="background-color: #6b2d8b"
          >
            <span class="text-white font-bold text-xs" aria-hidden="true"
              >M</span
            >
          </div>
          <span
            class="font-semibold text-white group-hover:text-violet-400 transition-colors text-sm"
          >
            Megaport CLI
          </span>
          <span class="text-gray-600 text-sm hidden sm:inline">Tutorial</span>
        </NuxtLink>

        <!-- Center nav -->
        <nav
          class="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
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

        <!-- Right: mobile menu + search + CTA -->
        <div class="flex items-center gap-2">
          <!-- Mobile hamburger -->
          <button
            class="md:hidden p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Open navigation menu"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <!-- Search button -->
          <button
            class="flex items-center gap-1.5 p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Search tutorials (⌘K)"
            title="Search tutorials, guides & reference docs"
            @click="searchOpen = true"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span
              class="hidden md:inline-flex items-center gap-1 text-xs text-gray-500 border border-gray-700 rounded px-1.5 py-0.5 font-mono"
            >
              <span>⌘K</span>
            </span>
          </button>

          <!-- Try Live Demo CTA (matches other layouts) -->
          <NuxtLink
            to="/demos"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-colors"
            style="background-color: #6b2d8b"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Try Live Demo
          </NuxtLink>

          <!-- Dark mode toggle (non-functional — site is dark-only, placeholder for future light theme) -->
          <!--
          <button
            class="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            :aria-label="
              colorMode.value === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            "
            @click="toggleColorMode"
          >
            <svg
              v-if="colorMode.value === 'dark'"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
          -->
        </div>
      </div>
    </header>

    <!-- Mobile nav dropdown -->
    <Transition name="slide-down">
      <nav
        v-if="mobileMenuOpen"
        class="md:hidden border-b border-gray-800 bg-gray-950 px-4 py-3 space-y-1"
        aria-label="Mobile navigation"
      >
        <NuxtLink
          v-for="link in headerLinks"
          :key="link.to"
          :to="link.to"
          class="block px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          active-class="text-white bg-gray-800"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </Transition>

    <!-- ── Full-width content ── -->
    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <!-- Search modal -->
    <SearchModal v-model="searchOpen" />

    <!-- ── Footer ── -->
    <footer class="border-t border-gray-800 bg-gray-950 py-12 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10"
        >
          <!-- Brand -->
          <div>
            <NuxtLink
              to="/"
              class="flex items-center gap-2.5 mb-4 group w-fit"
              aria-label="Go to Megaport CLI landing page"
            >
              <div
                class="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style="background-color: #6b2d8b"
              >
                <span class="text-white font-bold text-xs" aria-hidden="true"
                  >M</span
                >
              </div>
              <span
                class="font-semibold text-white text-sm group-hover:text-violet-400 transition-colors"
                >Megaport CLI</span
              >
            </NuxtLink>
            <p class="text-sm text-gray-500 leading-relaxed">
              The complete guide to managing network infrastructure from your
              terminal or browser.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul class="space-y-2.5 text-sm">
              <li>
                <NuxtLink
                  to="/core-concepts/resource-types#port"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Ports</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/core-concepts/resource-types#vxc"
                  class="text-gray-400 hover:text-white transition-colors"
                  >VXCs</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/core-concepts/resource-types#mcr"
                  class="text-gray-400 hover:text-white transition-colors"
                  >MCR</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/tutorials"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Tutorials</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/reference/command-reference"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Command Reference</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h4 class="text-sm font-semibold text-white mb-4">Support</h4>
            <ul class="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.megaport.com/contact/support/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Support Portal
                </a>
              </li>
              <li>
                <a
                  href="https://dev.megaport.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h4 class="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul class="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/megaport/megaport-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://dev.megaport.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Docs
                </a>
              </li>
              <li>
                <NuxtLink
                  to="/demos"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Live Demo</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div
          class="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500"
        >
          <span
            >© {{ new Date().getFullYear() }} Megaport. All rights
            reserved.</span
          >
          <span class="text-gray-600">Powered by Megaport CLI WASM</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const searchOpen = ref(false);
const mobileMenuOpen = ref(false);

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchOpen.value = true;
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}

const headerLinks = useHeaderLinks();
</script>
