<template>
  <div class="my-6">
    <ClientOnly>
      <div class="py-4 px-6 flex justify-center rounded-xl bg-slate-100 max-w-2xl mx-auto">
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
        primaryColor: '#ede9fe',
        primaryTextColor: '#1e1b4b',
        primaryBorderColor: '#6B2D8B',
        lineColor: '#6B2D8B',
        secondaryColor: '#f0fdfa',
        tertiaryColor: '#f3f4f6',
        background: 'transparent',
        mainBkg: '#ede9fe',
        nodeBorder: '#6B2D8B',
        nodeTextColor: '#1e1b4b',
        clusterBkg: '#f8fafc',
        clusterBorder: '#6B2D8B',
        titleColor: '#1e1b4b',
        edgeLabelBackground: '#ffffff',
        labelTextColor: '#374151',
        fontSize: '20px',
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
  max-width: 100%;
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
  color: #374151;
  background: #ffffff;
  padding: 2px 6px;
  border-radius: 4px;
}

.mermaid-diagram :deep(text) {
  fill: #1e1b4b !important;
}

.mermaid-diagram :deep(.label) {
  color: #1e1b4b;
}
</style>
