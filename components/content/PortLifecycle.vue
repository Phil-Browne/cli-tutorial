<template>
  <div class="my-6 rounded-xl border border-gray-800 bg-gray-900/40 p-6 max-w-xl mx-auto">
    <div class="grid grid-cols-[1fr_auto_1fr] gap-y-1 items-center">
      <!-- Row 1: ports buy label -->
      <div />
      <div class="text-xs text-gray-500 font-mono text-center py-1">ports buy</div>
      <div />

      <!-- Row 2: CONFIGURED + CANCELLED branch -->
      <div class="flex items-center justify-end gap-2">
        <span class="text-[10px] text-gray-500">delete before live</span>
        <span class="text-gray-600">←</span>
      </div>
      <div class="state border-violet-500 bg-violet-500/15 text-violet-300">CONFIGURED</div>
      <div class="flex items-center gap-2">
        <span class="text-gray-600">→</span>
        <div class="state-sm border-gray-600 text-gray-400">CANCELLED</div>
      </div>

      <!-- connector -->
      <div /><div class="connector" /><div />

      <!-- Row 3: label -->
      <div />
      <div class="text-[10px] text-gray-500 text-center">fabric provisioning</div>
      <div />

      <!-- connector -->
      <div /><div class="connector" /><div />

      <!-- Row 4: LIVE -->
      <div />
      <div class="state border-emerald-500 bg-emerald-500/15 text-emerald-300">LIVE</div>
      <div />

      <!-- connector -->
      <div /><div class="connector" /><div />

      <!-- Row 5: label -->
      <div />
      <div class="text-[10px] text-gray-500 text-center">ports delete</div>
      <div />

      <!-- connector -->
      <div /><div class="connector" /><div />

      <!-- Row 6: DECOMMISSIONING + restore branch -->
      <div />
      <div class="state border-amber-500 bg-amber-500/15 text-amber-300">DECOMMISSIONING</div>
      <div class="flex items-center gap-2">
        <span class="text-gray-600">→</span>
        <span class="text-[10px] text-gray-500">restore</span>
        <span class="text-gray-600">→</span>
        <span class="text-[10px] text-violet-400 font-semibold">CONFIGURED</span>
      </div>

      <!-- connector -->
      <div /><div class="connector" /><div />

      <!-- Row 7: label -->
      <div />
      <div class="text-[10px] text-gray-500 text-center">billing period ends</div>
      <div />

      <!-- connector -->
      <div /><div class="connector" /><div />

      <!-- Row 8: DECOMMISSIONED -->
      <div />
      <div class="state border-red-500 bg-red-500/15 text-red-300">DECOMMISSIONED</div>
      <div />
    </div>
  </div>
</template>

<style scoped>
.state {
  @apply px-5 py-2 rounded-lg border-2 font-semibold text-sm text-center;
}

.state-sm {
  @apply px-3 py-1 rounded-md border text-xs font-medium text-center;
}

.connector {
  @apply w-0.5 h-2 bg-gray-700 mx-auto;
}
</style>
