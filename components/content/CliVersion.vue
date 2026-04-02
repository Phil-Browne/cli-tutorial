<template>
  <code>{{ version }}</code>
</template>

<script setup lang="ts">
const version = ref('latest')

onMounted(async () => {
  try {
    const res = await fetch('/api/cli-version')
    if (res.ok) {
      const data = await res.json()
      version.value = data.version ?? 'latest'
    }
  } catch {
    // keep "latest" as fallback
  }
})
</script>
