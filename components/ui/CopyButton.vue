<template>
  <button
    class="copy-btn flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors shrink-0"
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
    <span>{{ copied ? 'Copied!' : label }}</span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string
  label?: string
}>(), {
  label: 'Copy',
})

const copied = ref(false)
const { track } = useAnalytics()

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.text)
  } catch {
    const el = document.createElement('textarea')
    el.value = props.text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copied.value = true
  track('Copy', { text: props.text.slice(0, 100) })
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
