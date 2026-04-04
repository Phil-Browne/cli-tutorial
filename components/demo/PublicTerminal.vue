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

    <!-- Terminal area — always rendered so xterm.js can measure its container -->
    <div class="terminal-area-wrapper" :style="{ height: `${height}px` }">
      <!-- Loading skeleton overlay -->
      <Transition name="fade">
        <div v-if="!terminalReady" class="terminal-skeleton-overlay">
          <div class="skeleton skeleton-line w-1/3" />
          <div class="skeleton skeleton-line w-1/2" />
          <div class="skeleton skeleton-line w-2/5" />
          <div class="skeleton skeleton-line w-3/5" />
          <div class="skeleton skeleton-line w-1/4" />
        </div>
      </Transition>

      <!-- Terminal (always in DOM) -->
      <div class="terminal-area">
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
    setTimeout(() => { terminalReady.value = true }, 1200)
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

.terminal-area-wrapper {
  position: relative;
}

.terminal-skeleton-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: #030712;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.terminal-area {
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
