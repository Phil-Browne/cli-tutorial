<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
    :class="variantClasses"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
type Variant = 'default' | 'soft' | 'outline'

const props = defineProps<{
  variant?: Variant
  color?: 'violet' | 'green' | 'amber' | 'red' | 'blue' | 'gray'
}>()

const variantClasses = computed(() => {
  const c = props.color ?? 'violet'
  const colorMap: Record<string, Record<Variant, string>> = {
    violet: {
      default: 'bg-violet-600 text-white border-violet-600',
      soft: 'bg-violet-950 text-violet-300 border-violet-800',
      outline: 'bg-transparent text-violet-400 border-violet-600',
    },
    green: {
      default: 'bg-green-600 text-white border-green-600',
      soft: 'bg-green-950 text-green-300 border-green-800',
      outline: 'bg-transparent text-green-400 border-green-600',
    },
    amber: {
      default: 'bg-amber-600 text-white border-amber-600',
      soft: 'bg-amber-950 text-amber-300 border-amber-800',
      outline: 'bg-transparent text-amber-400 border-amber-600',
    },
    red: {
      default: 'bg-red-600 text-white border-red-600',
      soft: 'bg-red-950 text-red-300 border-red-800',
      outline: 'bg-transparent text-red-400 border-red-600',
    },
    blue: {
      default: 'bg-blue-600 text-white border-blue-600',
      soft: 'bg-blue-950 text-blue-300 border-blue-800',
      outline: 'bg-transparent text-blue-400 border-blue-600',
    },
    gray: {
      default: 'bg-gray-600 text-white border-gray-600',
      soft: 'bg-gray-800 text-gray-300 border-gray-700',
      outline: 'bg-transparent text-gray-400 border-gray-600',
    },
  }
  return colorMap[c]?.[props.variant ?? 'soft'] ?? colorMap.violet.soft
})
</script>
