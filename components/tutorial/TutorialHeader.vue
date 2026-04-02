<template>
  <div class="mb-10 pb-8 border-b border-gray-800">
    <!-- Audience + difficulty badges -->
    <div class="flex flex-wrap items-center gap-2 mb-4">
      <UiBadge v-if="difficulty" :variant="difficultyVariant">{{ difficulty }}</UiBadge>
      <span v-if="duration" class="inline-flex items-center gap-1 text-xs text-gray-400">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ duration }}
      </span>
      <span
        v-for="tag in audience"
        :key="tag"
        class="px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-400 border border-gray-700"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Title -->
    <h1 class="text-3xl font-bold text-white mb-3">{{ title }}</h1>

    <!-- Description -->
    <p v-if="description" class="text-lg text-gray-400 leading-relaxed">
      {{ description }}
    </p>

    <!-- Prerequisites -->
    <div v-if="prerequisites?.length" class="mt-5 p-4 rounded-lg bg-gray-900 border border-gray-800">
      <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Prerequisites</p>
      <ul class="space-y-1">
        <li
          v-for="prereq in prerequisites"
          :key="prereq"
          class="flex items-center gap-2 text-sm text-gray-300"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
          {{ prereq }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

const props = defineProps<{
  title: string
  description?: string
  duration?: string
  difficulty?: Difficulty
  audience?: string[]
  prerequisites?: string[]
}>()

const difficultyVariant = computed(() => {
  switch (props.difficulty) {
    case 'Beginner': return 'soft'
    case 'Intermediate': return 'soft'
    case 'Advanced': return 'soft'
    default: return 'soft'
  }
})
</script>
