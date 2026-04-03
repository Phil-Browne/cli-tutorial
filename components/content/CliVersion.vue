<template>
  <code>{{ version ?? 'latest' }}</code>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('cli-version', () =>
  $fetch<{ version: string }>('/api/cli-version').catch(() => ({ version: 'latest' }))
)
const version = computed(() => data.value?.version ?? 'latest')
</script>
