<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
    <!-- Minimal header -->
    <header class="border-b border-gray-800 bg-gray-950">
      <div class="flex items-center px-6 h-14">
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
        </NuxtLink>
      </div>
    </header>

    <!-- Centered content -->
    <main class="flex-1 flex items-center justify-center px-6 py-16">
      <div class="max-w-lg w-full text-center">
        <div class="text-8xl font-bold text-gray-800 mb-4 select-none">
          {{ error.statusCode }}
        </div>

        <h1 class="text-2xl font-semibold text-white mb-3">
          {{ is404 ? 'Page not found' : 'Something went wrong' }}
        </h1>

        <p class="text-gray-400 mb-8">
          {{ is404
            ? "The page you're looking for doesn't exist or has moved."
            : 'An unexpected error occurred. Please try again.' }}
        </p>

        <!-- Quick nav -->
        <div class="grid grid-cols-2 gap-3 mb-8">
          <NuxtLink
            v-for="link in quickLinks"
            :key="link.to"
            :to="link.to"
            class="p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-violet-700 hover:bg-gray-900 transition-all text-left group"
            @click="clearNuxtError()"
          >
            <div class="text-lg mb-1">{{ link.icon }}</div>
            <div class="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">{{ link.label }}</div>
            <div class="text-xs text-gray-500 mt-0.5">{{ link.description }}</div>
          </NuxtLink>
        </div>

        <button
          class="text-sm text-violet-400 hover:text-violet-300 transition-colors underline"
          @click="clearError"
        >
          ← Back to home
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string } }>()

const is404 = computed(() => props.error.statusCode === 404)

function clearError() {
  clearNuxtError()
  navigateTo('/')
}

const quickLinks = [
  { to: '/getting-started', icon: '🚀', label: 'Get Started', description: 'Install and configure the CLI' },
  { to: '/tutorials', icon: '📚', label: 'Tutorials', description: 'Step-by-step walkthroughs' },
  { to: '/demos', icon: '⚡', label: 'Live Demo', description: 'Try the CLI in your browser' },
  { to: '/reference', icon: '📖', label: 'Reference', description: 'Commands and resources' },
]
</script>
