<template>
  <div class="my-6">
    <ClientOnly>
      <div class="p-8 flex justify-center">
        <div ref="diagramRef" class="mermaid-diagram" v-html="renderedSvg" />
      </div>
      <template #fallback>
        <div class="p-8 flex justify-center">
          <div class="skeleton w-full h-48 rounded-lg" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  definition: string
}>()

const renderedSvg = ref('')
const diagramRef = ref<HTMLElement>()

onMounted(async () => {
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#6B2D8B',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#9B5DBB',
        lineColor: '#5ED4E6',
        secondaryColor: '#1A1A2E',
        tertiaryColor: '#2A2A4E',
        background: '#030712',
        mainBkg: '#1f2937',
        nodeBorder: '#6B2D8B',
        clusterBkg: '#1f2937',
        titleColor: '#e2e8f0',
        edgeLabelBackground: '#1f2937',
        fontSize: '16px',
      },
    })

    const id = `mermaid-${Math.random().toString(36).slice(2)}`
    const { svg } = await mermaid.render(id, props.definition)
    renderedSvg.value = svg
  } catch (err) {
    console.error('Mermaid render error:', err)
    renderedSvg.value = `<pre class="text-xs text-gray-400">${props.definition}</pre>`
  }
})
</script>

<style scoped>
.mermaid-diagram :deep(svg) {
  width: 100%;
  min-height: 300px;
  height: auto;
}

.mermaid-diagram :deep(.node rect),
.mermaid-diagram :deep(.node polygon) {
  rx: 8;
  ry: 8;
}

.mermaid-diagram :deep(.edgePath path) {
  stroke-width: 2px;
}
</style>
