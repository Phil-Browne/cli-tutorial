<template>
  <div class="flex items-center gap-1 p-1 rounded-lg bg-gray-800 border border-gray-700 w-fit">
    <button
      v-for="option in options"
      :key="option.value"
      class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
      :class="audience === option.value
        ? 'bg-gray-950 text-white shadow-sm'
        : 'text-gray-400 hover:text-white'"
      @click="audience = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
const options = [
  { value: 'sa', label: 'Solutions Architect' },
  { value: 'sales', label: 'Sales' },
]

// Shared global state so child components can react
const audience = useState<'sa' | 'sales'>('audience', () => 'sa')
</script>
