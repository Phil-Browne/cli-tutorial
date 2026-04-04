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

    <!-- Terminal — MegaportTerminal handles its own loading/error states -->
    <div class="terminal-area" :style="{ height: `${height}px` }">
      <ClientOnly>
        <MegaportTerminal
          ref="termRef"
          prefill-command="locations list --country &quot;Australia&quot;"
          welcome-message="Megaport CLI (Public Mode — no login required)
Available command: locations list
Try: megaport-cli locations list --metro Sydney
     megaport-cli locations list --output json
"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  height?: number
}>(), {
  height: 600,
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

.terminal-area {
  width: 100%;
  /* Use flex so the ClientOnly wrapper div and MegaportTerminal stretch to fill */
  display: flex;
  flex-direction: column;
  /* Prevent the last prompt line from being clipped */
  overflow: visible;
}

.terminal-area :deep(> *) {
  flex: 1;
  min-height: 0;
}

.terminal-area :deep(.megaport-terminal-container) {
  flex: 1;
  min-height: 0;
}
</style>
