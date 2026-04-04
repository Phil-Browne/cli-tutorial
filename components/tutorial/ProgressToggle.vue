<template>
  <div class="flex items-center gap-3 mt-6 pt-4 border-t border-gray-800">
    <button
      class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
      :class="completed
        ? 'bg-green-900/30 text-green-400 border border-green-800 hover:bg-green-900/50'
        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white'"
      @click="toggle"
    >
      <svg v-if="completed" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke-width="2" />
      </svg>
      {{ completed ? 'Completed' : 'Mark as complete' }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ path: string }>()
const { isCompleted, markCompleted, markIncomplete } = useProgress()

const completed = computed(() => isCompleted(props.path))

function toggle() {
  if (completed.value) {
    markIncomplete(props.path)
  } else {
    markCompleted(props.path)
  }
}
</script>
