<template>
  <NetworkDiagram v-if="language === 'mermaid'" :definition="code ?? ''" />
  <slot v-else />
</template>

<script setup lang="ts">
defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()
</script>
