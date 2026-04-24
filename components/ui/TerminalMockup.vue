<template>
  <div
    class="terminal-window rounded-xl overflow-hidden border border-gray-700 shadow-2xl bg-gray-950 font-mono text-sm select-none"
  >
    <!-- Title bar -->
    <div
      class="flex items-center gap-1.5 px-4 py-3 bg-gray-900 border-b border-gray-800"
    >
      <span class="w-3 h-3 rounded-full bg-red-500/80" />
      <span class="w-3 h-3 rounded-full bg-yellow-500/80" />
      <span class="w-3 h-3 rounded-full bg-green-500/80" />
      <span class="ml-3 text-xs text-gray-500 flex-1 text-center"
        >megaport-cli — terminal</span
      >
    </div>

    <!-- Terminal content -->
    <div class="p-5 text-left leading-relaxed h-[28rem] overflow-hidden">
      <!-- Session 1: port list -->
      <div
        :class="[
          'transition-opacity duration-500',
          phase >= 0 ? 'opacity-100' : 'opacity-0',
        ]"
      >
        <div class="flex items-center gap-2">
          <span class="text-green-400">$</span>
          <span class="text-gray-100 typing-command" :style="{ '--chars': 31 }"
            >megaport-cli ports list --table</span
          >
          <span
            class="cursor"
            :class="phase === 0 ? 'opacity-100' : 'opacity-0'"
          />
        </div>
      </div>

      <!-- Table output -->
      <div v-if="phase >= 1" class="mt-2 fade-in">
        <pre
          class="text-xs leading-relaxed whitespace-pre text-gray-300"
        ><span class="text-cyan-400">┌──────────┬────────────────┬───────┬────────┐
│ UID      │ Name           │ Speed │ Status │
├──────────┼────────────────┼───────┼────────┤</span>
│ <span class="text-violet-300">abc-123</span>  │ Sydney Port    │ 10G   │ <span class="text-green-400">LIVE</span>   │
│ <span class="text-violet-300">def-456</span>  │ Singapore MCR  │ 5G    │ <span class="text-green-400">LIVE</span>   │
│ <span class="text-violet-300">ghi-789</span>  │ Tokyo VXC      │ 1G    │ <span class="text-green-400">LIVE</span>   │
<span class="text-cyan-400">└──────────┴────────────────┴───────┴────────┘</span></pre>
        <p class="text-xs text-gray-500 mt-1">3 resources found</p>
      </div>

      <!-- Session 2: location list -->
      <div v-if="phase >= 2" class="mt-4">
        <div class="flex items-center gap-2">
          <span class="text-green-400">$</span>
          <span class="text-gray-100"
            >megaport-cli locations list --country Australia</span
          >
          <span
            class="cursor"
            :class="phase === 2 ? 'opacity-100' : 'opacity-0'"
          />
        </div>
      </div>

      <div v-if="phase >= 3" class="mt-2 fade-in">
        <pre
          class="text-xs leading-relaxed whitespace-pre text-gray-300"
        ><span class="text-cyan-400">┌─────┬───────────────────────┬───────────┐
│ ID  │ Name                  │ Country   │
├─────┼───────────────────────┼───────────┤</span>
│ <span class="text-violet-300">3</span>   │ NextDC S1 Sydney      │ <span class="text-yellow-300">Australia</span> │
│ <span class="text-violet-300">6</span>   │ Equinix SY3 Sydney    │ <span class="text-yellow-300">Australia</span> │
│ <span class="text-violet-300">137</span> │ NextDC M2 Melbourne   │ <span class="text-yellow-300">Australia</span> │
<span class="text-cyan-400">└─────┴───────────────────────┴───────────┘</span></pre>
        <div class="mt-2 flex items-center gap-2">
          <span class="text-green-400">$</span>
          <span class="cursor opacity-100 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const phase = ref(-1);

// Sequence: 0=command1 typed, 1=table shown, 2=command2 typed, 3=table2 shown
const delays = [400, 1800, 2600, 4000];

let timers: ReturnType<typeof setTimeout>[] = [];

function runSequence() {
  timers.forEach(clearTimeout);
  timers = [];
  phase.value = -1;

  delays.forEach((delay, i) => {
    timers.push(
      setTimeout(() => {
        phase.value = i;
      }, delay),
    );
  });

  // Loop
  timers.push(setTimeout(runSequence, 7000));
}

onMounted(() => {
  // Skip animation sequence for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    phase.value = delays.length - 1;
    return;
  }
  runSequence();
});
onUnmounted(() => timers.forEach(clearTimeout));
</script>

<style scoped>
.typing-command {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 1.2s steps(var(--chars), end) 0.4s both;
  max-width: fit-content;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: #a855f7;
  animation: blink 1s step-end infinite;
  vertical-align: text-bottom;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.fade-in {
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .typing-command {
    animation: none;
    width: 100%;
  }
  .cursor {
    animation: none;
    opacity: 0;
  }
  .fade-in {
    animation: none;
    opacity: 1;
  }
}
</style>
