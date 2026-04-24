<template>
  <div class="my-6 not-prose max-w-2xl mx-auto">
    <div class="rounded-xl border border-gray-800 bg-gray-900/40 p-6">
      <!-- MCR hub in center -->
      <div class="flex flex-col items-center gap-4">
        <!-- On-prem leg -->
        <div class="node border-teal-500 bg-teal-500/10 text-teal-200">
          <span class="text-lg">🔌</span>
          <span class="text-xs font-bold">Port</span>
          <span class="text-[10px] opacity-70">NextDC S1 · ASN 65001</span>
        </div>
        <div class="flex items-center justify-center gap-1">
          <span class="text-gray-500">↓</span>
          <span class="text-[10px] text-gray-500">VXC 2G</span>
        </div>

        <!-- MCR Hub -->
        <div class="node-lg border-violet-500 bg-violet-500/15 text-violet-200">
          <span class="text-xl">🌐</span>
          <span class="text-sm font-bold">MCR</span>
          <span class="text-xs opacity-70">Cloud Router SYD · ASN 64512 · 10 Gbps</span>
        </div>

        <!-- Cloud spokes -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          <!-- AWS -->
          <div class="spoke">
            <div class="flex items-center justify-center gap-1 mb-2">
              <span class="text-gray-500">↓</span>
              <span class="text-[10px] text-gray-500">VXC 1G</span>
            </div>
            <div class="node border-amber-500 bg-amber-500/10 text-amber-200">
              <span class="text-lg">☁️</span>
              <span class="text-xs font-bold">AWS</span>
              <span class="text-[10px] opacity-70">Direct Connect</span>
            </div>
            <div class="flex items-center justify-center gap-1 my-1">
              <span class="text-gray-600 text-xs">↓</span>
            </div>
            <div class="node-sm border-amber-500/40 text-amber-300/70">
              VPC 10.1.0.0/16
            </div>
          </div>

          <!-- Azure -->
          <div class="spoke">
            <div class="flex items-center justify-center gap-1 mb-2">
              <span class="text-gray-500">↓</span>
              <span class="text-[10px] text-gray-500">VXC 1G</span>
            </div>
            <div class="node border-blue-500 bg-blue-500/10 text-blue-200">
              <span class="text-lg">☁️</span>
              <span class="text-xs font-bold">Azure</span>
              <span class="text-[10px] opacity-70">ExpressRoute</span>
            </div>
            <div class="flex items-center justify-center gap-1 my-1">
              <span class="text-gray-600 text-xs">↓</span>
            </div>
            <div class="node-sm border-blue-500/40 text-blue-300/70">
              VNet 10.2.0.0/16
            </div>
          </div>

          <!-- GCP -->
          <div class="spoke">
            <div class="flex items-center justify-center gap-1 mb-2">
              <span class="text-gray-500">↓</span>
              <span class="text-[10px] text-gray-500">VXC 1G</span>
            </div>
            <div class="node border-emerald-500 bg-emerald-500/10 text-emerald-200">
              <span class="text-lg">☁️</span>
              <span class="text-xs font-bold">Google Cloud</span>
              <span class="text-[10px] opacity-70">Interconnect</span>
            </div>
            <div class="flex items-center justify-center gap-1 my-1">
              <span class="text-gray-600 text-xs">↓</span>
            </div>
            <div class="node-sm border-emerald-500/40 text-emerald-300/70">
              VPC 10.3.0.0/16
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.node {
  @apply flex flex-col items-center gap-0.5 px-4 py-3 rounded-lg border-2 text-center;
}

.node-lg {
  @apply flex flex-col items-center gap-0.5 px-8 py-4 rounded-xl border-2 text-center;
}

.node-sm {
  @apply px-3 py-1.5 rounded-md border text-[10px] font-mono text-center;
}

.spoke {
  @apply flex flex-col items-center;
}
</style>
