<template>
  <span
    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border"
    :class="styles.classes"
  >
    <span class="font-bold">{{ styles.letter }}</span>
    {{ type }}
  </span>
</template>

<script setup lang="ts">
type ResourceType = 'Port' | 'VXC' | 'MCR' | 'MVE' | 'IX' | 'Location' | 'Partner' | 'Service Key' | 'User'

const props = defineProps<{
  type: ResourceType | string
}>()

const styleMap: Record<string, { letter: string; classes: string }> = {
  Port:        { letter: 'P', classes: 'bg-blue-950 text-blue-300 border-blue-700' },
  VXC:         { letter: 'V', classes: 'bg-green-950 text-green-300 border-green-700' },
  MCR:         { letter: 'M', classes: 'bg-violet-950 text-violet-300 border-violet-700' },
  MVE:         { letter: 'E', classes: 'bg-orange-950 text-orange-300 border-orange-700' },
  IX:          { letter: 'X', classes: 'bg-teal-950 text-teal-300 border-teal-700' },
  Location:    { letter: 'L', classes: 'bg-sky-950 text-sky-300 border-sky-700' },
  Partner:     { letter: 'R', classes: 'bg-pink-950 text-pink-300 border-pink-700' },
  'Service Key': { letter: 'K', classes: 'bg-yellow-950 text-yellow-300 border-yellow-700' },
  User:        { letter: 'U', classes: 'bg-slate-800 text-slate-300 border-slate-600' },
}

const styles = computed(() =>
  styleMap[props.type] ?? { letter: props.type[0]?.toUpperCase() ?? '?', classes: 'bg-gray-800 text-gray-300 border-gray-600' }
)
</script>
