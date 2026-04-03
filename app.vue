<template>
  <NuxtLayout>
    <Suspense>
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
      <template #fallback>
        <div class="min-h-screen bg-gray-950 flex items-center justify-center">
          <div class="flex flex-col items-center gap-4 text-gray-500">
            <div class="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
            <span class="text-sm">Loading…</span>
          </div>
        </div>
      </template>
    </Suspense>
  </NuxtLayout>
</template>
