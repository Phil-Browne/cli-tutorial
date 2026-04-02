<template>
  <div class="my-8 max-w-md mx-auto">
    <!-- Main vertical flow -->
    <div class="flex flex-col items-center">
      <!-- ports buy -->
      <div class="text-xs text-gray-500 mb-2 font-mono">ports buy</div>
      <div class="w-0.5 h-4 bg-gray-600" />

      <!-- CONFIGURED -->
      <div class="state-node border-violet-500 bg-violet-500/15 text-violet-300">CONFIGURED</div>
      <div class="w-0.5 h-3 bg-gray-600" />
      <div class="text-[11px] text-gray-500">fabric provisioning</div>
      <div class="w-0.5 h-3 bg-gray-600" />

      <!-- LIVE -->
      <div class="state-node border-emerald-500 bg-emerald-500/15 text-emerald-300">LIVE</div>
      <div class="w-0.5 h-3 bg-gray-600" />
      <div class="text-[11px] text-gray-500">ports delete</div>
      <div class="w-0.5 h-3 bg-gray-600" />

      <!-- DECOMMISSIONING -->
      <div class="state-node border-amber-500 bg-amber-500/15 text-amber-300">DECOMMISSIONING</div>
      <div class="w-0.5 h-3 bg-gray-600" />
      <div class="text-[11px] text-gray-500">billing period ends</div>
      <div class="w-0.5 h-3 bg-gray-600" />

      <!-- DECOMMISSIONED -->
      <div class="state-node border-red-500 bg-red-500/15 text-red-300">DECOMMISSIONED</div>
    </div>

    <!-- Branch paths -->
    <div class="mt-6 flex flex-col gap-2">
      <div class="branch-row">
        <span class="branch-from border-violet-500/40 text-violet-400">CONFIGURED</span>
        <span class="text-gray-600">→</span>
        <span class="branch-to text-gray-400">CANCELLED</span>
        <span class="branch-label">delete before going live</span>
      </div>
      <div class="branch-row">
        <span class="branch-from border-amber-500/40 text-amber-400">DECOMMISSIONING</span>
        <span class="text-gray-600">→</span>
        <span class="branch-from border-violet-500/40 text-violet-400">CONFIGURED</span>
        <span class="branch-label">restore within window</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.state-node {
  @apply px-6 py-2.5 rounded-lg border-2 font-semibold text-sm text-center tracking-wide;
}

.branch-row {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-800 text-xs;
}

.branch-from {
  @apply px-2 py-0.5 rounded border font-semibold text-xs;
}

.branch-to {
  @apply px-2 py-0.5 rounded border border-gray-600 font-semibold text-xs;
}

.branch-label {
  @apply text-gray-500 ml-auto;
}
</style>
