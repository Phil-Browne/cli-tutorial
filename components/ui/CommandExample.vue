<template>
  <div
    class="rounded-xl border border-gray-700 overflow-hidden my-4 font-mono text-sm flex flex-col"
  >
    <!-- Command bar -->
    <div class="flex items-center justify-between gap-3 px-4 py-3 bg-gray-900">
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <span class="text-green-400 shrink-0 select-none">$</span>
        <span class="text-gray-100 break-all">{{ command }}</span>
      </div>
      <button
        class="flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-500 hover:text-white hover:bg-gray-700 transition-colors shrink-0"
        :aria-label="
          copied ? 'Copied to clipboard' : 'Copy command to clipboard'
        "
        @click="copy"
      >
        <svg
          v-if="!copied"
          class="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <svg
          v-else
          class="w-3.5 h-3.5 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
    </div>

    <!-- Optional description -->
    <p
      v-if="description"
      class="px-4 py-2 text-xs text-gray-500 bg-gray-900/50 border-t border-gray-800 font-sans"
    >
      {{ description }}
    </p>

    <!-- Optional output -->
    <div
      v-if="output"
      class="border-t border-gray-800 px-4 py-3 bg-gray-950 text-gray-400 whitespace-pre-wrap text-xs leading-relaxed"
    >
      {{ output }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  command: string;
  output?: string;
  description?: string;
}>();

const copied = ref(false);

async function copy() {
  await navigator.clipboard.writeText(props.command);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>
