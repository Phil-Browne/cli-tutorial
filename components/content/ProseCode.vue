<template>
  <NetworkDiagram v-if="language === 'mermaid'" :definition="code ?? ''" />
  <div v-else class="prose-code-wrapper group relative rounded-xl border border-gray-800 bg-gray-900 my-4">
    <!-- Header bar -->
    <div class="flex items-center justify-between px-4 py-2 bg-gray-800/60 border-b border-gray-700">
      <div class="flex items-center gap-2">
        <span v-if="filename" class="text-xs text-gray-400 font-mono">{{ filename }}</span>
        <span v-if="language" class="text-xs text-gray-500 font-mono uppercase">{{ language }}</span>
      </div>
      <button
        class="flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors"
        :class="copied ? 'text-green-400' : 'text-gray-400 hover:text-white hover:bg-gray-700'"
        :aria-label="copied ? 'Copied to clipboard' : 'Copy to clipboard'"
        @click="handleCopy"
      >
        <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>

    <!-- Syntax-highlighted content from Shiki -->
    <div class="prose-code-content overflow-x-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()

const copied = ref(false)
const { track } = useAnalytics()
const { show } = useToast()

async function handleCopy() {
  const text = props.code ?? ''
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copied.value = true
  show('Copied to clipboard')
  track('Copy Command', { command: text.slice(0, 100) })
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
