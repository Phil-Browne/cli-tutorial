<template>
  <div>
    <ClientOnly>
      <div class="py-2 px-4 flex justify-center rounded-lg bg-gray-800 max-w-2xl mx-auto">
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
        primaryColor: '#2e1065',
        primaryTextColor: '#e2e8f0',
        primaryBorderColor: '#9B5DBB',
        lineColor: '#9B5DBB',
        secondaryColor: '#1e293b',
        tertiaryColor: '#1e293b',
        background: 'transparent',
        mainBkg: '#2e1065',
        nodeBorder: '#9B5DBB',
        nodeTextColor: '#e2e8f0',
        clusterBkg: '#1e293b',
        clusterBorder: '#9B5DBB',
        titleColor: '#e2e8f0',
        edgeLabelBackground: '#1e293b',
        labelTextColor: '#cbd5e1',
        fontSize: '20px',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
    })

    const id = `mermaid-${Math.random().toString(36).slice(2)}`
    const { svg } = await mermaid.render(id, props.definition)
    // Trim Mermaid's default padding by tightening the viewBox
    renderedSvg.value = svg.replace(
      /viewBox="([^"]*)" style="[^"]*"/,
      (_, vb) => {
        const [x, y, w, h] = vb.split(' ').map(Number)
        const pad = 8
        return `viewBox="${x + pad} ${y + pad} ${w - pad * 2} ${h - pad * 2}" style="max-width:100%;height:auto"`
      }
    )
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
  color: #cbd5e1;
  background: #1e293b;
  padding: 2px 6px;
  border-radius: 4px;
}

/* !important needed to override mermaid's inline SVG styles */
.mermaid-diagram :deep(text) {
  fill: #e2e8f0 !important;
}

.mermaid-diagram :deep(.label) {
  color: #e2e8f0;
}
</style>
