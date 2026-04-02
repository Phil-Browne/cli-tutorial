<template>
  <code>{{ version }}</code>
</template>

<script setup lang="ts">
const version = ref('latest')

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/megaport/megaport-cli/releases/latest')
    if (res.ok) {
      const data = await res.json()
      version.value = data.tag_name ?? 'latest'
    }
  } catch {
    // keep "latest" as fallback
  }
})
</script>
