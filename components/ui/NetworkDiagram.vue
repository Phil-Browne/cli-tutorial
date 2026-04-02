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
      theme: 'base',
      themeVariables: {
        primaryColor: '#374151',
        primaryTextColor: '#f3f4f6',
        primaryBorderColor: '#9B5DBB',
        lineColor: '#7dd3fc',
        secondaryColor: '#4c1d95',
        tertiaryColor: '#374151',
        background: 'transparent',
        mainBkg: '#374151',
        nodeBorder: '#9B5DBB',
        nodeTextColor: '#f3f4f6',
        clusterBkg: '#1f2937',
        clusterBorder: '#6B2D8B',
        titleColor: '#f3f4f6',
        edgeLabelBackground: '#1f2937',
        labelTextColor: '#e5e7eb',
        fontSize: '15px',
        fontFamily: 'Inter, system-ui, sans-serif',
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
.mermaid-diagram :deep(.node polygon),
.mermaid-diagram :deep(.node circle) {
  rx: 8;
  ry: 8;
}

.mermaid-diagram :deep(.edgePath path) {
  stroke-width: 2px;
}

.mermaid-diagram :deep(.edgeLabel) {
  color: #d1d5db;
  background: #1f2937;
  padding: 2px 6px;
  border-radius: 4px;
}

.mermaid-diagram :deep(text) {
  fill: #f3f4f6 !important;
}

.mermaid-diagram :deep(.label) {
  color: #f3f4f6;
}
</style>
