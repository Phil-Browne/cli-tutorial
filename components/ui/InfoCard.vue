<template>
  <div
    class="my-4 rounded-lg border-l-4 p-4"
    :class="styles.container"
  >
    <div class="flex items-start gap-3">
      <span class="text-lg shrink-0 mt-0.5">{{ styles.icon }}</span>
      <div class="flex-1 min-w-0">
        <p v-if="title ?? styles.defaultTitle" class="font-semibold text-sm mb-1" :class="styles.title">
          {{ title ?? styles.defaultTitle }}
        </p>
        <div class="text-sm prose-sm" :class="styles.body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type CardType = 'tip' | 'warning' | 'note' | 'important'

const props = defineProps<{
  type?: CardType
  title?: string
}>()

const styleMap: Record<CardType, {
  container: string
  title: string
  body: string
  icon: string
  defaultTitle: string
}> = {
  tip: {
    container: 'border-teal-500 bg-teal-950/30',
    title: 'text-teal-400',
    body: 'text-teal-100',
    icon: '💡',
    defaultTitle: 'Tip',
  },
  warning: {
    container: 'border-amber-500 bg-amber-950/30',
    title: 'text-amber-400',
    body: 'text-amber-100',
    icon: '⚠️',
    defaultTitle: 'Warning',
  },
  note: {
    container: 'border-blue-500 bg-blue-950/30',
    title: 'text-blue-400',
    body: 'text-blue-100',
    icon: 'ℹ️',
    defaultTitle: 'Note',
  },
  important: {
    container: 'border-red-500 bg-red-950/30',
    title: 'text-red-400',
    body: 'text-red-100',
    icon: '🔴',
    defaultTitle: 'Important',
  },
}

const styles = computed(() => styleMap[props.type ?? 'note'])
</script>
