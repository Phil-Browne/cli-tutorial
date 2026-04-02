<template>
  <div class="mt-12 pt-6 border-t border-gray-800 grid grid-cols-2 gap-4">
    <!-- Previous -->
    <NuxtLink
      v-if="prev"
      :to="prev.path"
      class="group flex flex-col gap-1 p-4 rounded-xl border border-gray-800 hover:border-violet-700 bg-gray-900 hover:bg-gray-900/80 transition-all"
    >
      <span class="flex items-center gap-1 text-xs text-gray-500 group-hover:text-violet-400 transition-colors">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </span>
      <span class="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{{ prev.title }}</span>
    </NuxtLink>
    <div v-else />

    <!-- Next -->
    <NuxtLink
      v-if="next"
      :to="next.path"
      class="group flex flex-col gap-1 p-4 rounded-xl border border-gray-800 hover:border-violet-700 bg-gray-900 hover:bg-gray-900/80 transition-all text-right"
    >
      <span class="flex items-center justify-end gap-1 text-xs text-gray-500 group-hover:text-violet-400 transition-colors">
        Next
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </span>
      <span class="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{{ next.title }}</span>
    </NuxtLink>
    <div v-else />
  </div>
</template>

<script setup lang="ts">
interface NavLink {
  title: string
  path: string
}

defineProps<{
  prev?: NavLink
  next?: NavLink
}>()
</script>
