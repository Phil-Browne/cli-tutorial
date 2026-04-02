<template>
  <div class="my-6 rounded-xl border border-gray-800 overflow-hidden">
    <div class="flex items-center gap-2 px-4 py-2 bg-gray-800/60 border-b border-gray-700 text-xs text-gray-400">
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
      Network Diagram
    </div>
    <ClientOnly>
      <div class="p-6 bg-gray-950 flex justify-center">
        <div ref="diagramRef" class="mermaid-diagram" v-html="renderedSvg" />
      </div>
      <template #fallback>
        <div class="p-6 bg-gray-950">
          <pre class="text-xs text-gray-400 font-mono whitespace-pre-wrap">{{ definition }}</pre>
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
        lineColor: '#00BCD4',
        secondaryColor: '#1A1A2E',
        tertiaryColor: '#2A2A4E',
        background: '#030712',
        mainBkg: '#1f2937',
        nodeBorder: '#6B2D8B',
        clusterBkg: '#1f2937',
        titleColor: '#e2e8f0',
        edgeLabelBackground: '#1f2937',
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
</style>
