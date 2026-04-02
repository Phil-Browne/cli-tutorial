<template>
  <div class="rounded-xl border border-gray-800 overflow-hidden bg-gray-900 my-4">
    <!-- Header bar -->
    <div class="flex items-center justify-between px-4 py-2.5 bg-gray-800/60 border-b border-gray-700">
      <!-- Tabs or filename -->
      <div class="flex items-center gap-1">
        <template v-if="tabs && tabs.length > 1">
          <button
            v-for="(tab, i) in tabs"
            :key="i"
            class="px-3 py-1 rounded-md text-xs font-medium transition-colors"
            :class="activeTab === i
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:text-white'"
            @click="activeTab = i"
          >
            {{ tab.label }}
          </button>
        </template>
        <span v-else-if="filename" class="text-xs text-gray-400 font-mono">
          {{ filename }}
        </span>
      </div>

      <!-- Right: lang badge + copy button -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-500 font-mono">{{ currentLang }}</span>
        <button
          class="flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          @click="copy"
        >
          <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <svg v-else class="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>

    <!-- Code content -->
    <div class="overflow-x-auto">
      <pre class="p-4 text-sm leading-relaxed font-mono text-gray-200 m-0 bg-transparent border-none rounded-none"><code>{{ currentCode }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  label: string
  code: string
  lang?: string
}

const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  tabs?: Tab[]
}>()

const activeTab = ref(0)
const copied = ref(false)
const { track } = useAnalytics()

const currentCode = computed(() =>
  props.tabs?.length ? props.tabs[activeTab.value]?.code ?? '' : props.code ?? ''
)

const currentLang = computed(() =>
  props.tabs?.length
    ? (props.tabs[activeTab.value]?.lang ?? props.language ?? '')
    : (props.language ?? '')
)

async function copy() {
  await navigator.clipboard.writeText(currentCode.value)
  copied.value = true
  track('Copy Command', { command: currentCode.value.slice(0, 100) })
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
