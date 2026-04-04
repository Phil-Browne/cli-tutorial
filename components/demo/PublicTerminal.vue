<template>
  <div class="public-terminal-wrapper">
    <!-- Status bar -->
    <div class="status-bar">
      <div class="status-left">
        <span class="status-dot status-dot--public"></span>
        <span class="status-text">Public Mode</span>
        <span class="env-badge env-public">no auth required</span>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="!terminalReady" class="terminal-skeleton" :style="{ height: `${height}px` }">
      <div class="skeleton skeleton-line w-1/3" />
      <div class="skeleton skeleton-line w-1/2" />
      <div class="skeleton skeleton-line w-2/5" />
    </div>

    <!-- Terminal -->
    <div v-show="terminalReady" class="terminal-area" :style="{ height: `${height}px` }">
      <ClientOnly>
        <MegaportTerminal
          ref="termRef"
          welcome-message="Megaport CLI (Public Mode — no login required)
Available commands: locations, partners, version
Type 'help' for details.
"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

withDefaults(defineProps<{
  height?: number
}>(), {
  height: 400,
})

const termRef = ref<{ isReady: boolean } | null>(null)
const terminalReady = ref(false)

// Show terminal once WASM is ready (no auth needed)
watch(() => termRef.value?.isReady, (ready) => {
  if (ready) {
    setTimeout(() => { terminalReady.value = true }, 800)
  }
})
</script>

<style scoped>
.public-terminal-wrapper {
  width: 100%;
  border: 1px solid #374151;
  border-radius: 12px;
  overflow: hidden;
  background: #030712;
}

.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
}

.status-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot--public {
  background: #60a5fa;
}

.status-text {
  font-size: 0.8125rem;
  color: #94a3b8;
}

.env-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.env-public {
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.terminal-skeleton {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.terminal-area {
  transition: height 0.15s ease;
}
</style>
