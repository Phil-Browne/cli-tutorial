<template>
  <div class="my-6 overflow-x-auto not-prose">
    <div class="flex items-stretch gap-0 px-2 py-4 justify-center flex-wrap sm:flex-nowrap">
      <template v-for="(step, i) in steps" :key="i">
        <!-- Arrow between steps -->
        <div v-if="i > 0" class="flex items-center px-1 text-gray-500">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <!-- Step box -->
        <div
          class="flex flex-col items-center justify-center rounded-lg border-2 px-4 py-3 text-center min-w-[7rem]"
          :class="stepClass(step.color)"
        >
          <span v-if="step.icon" class="text-lg mb-0.5">{{ step.icon }}</span>
          <span class="text-xs font-bold leading-tight">{{ step.label }}</span>
          <span v-if="step.sub" class="text-[10px] opacity-70 leading-tight mt-0.5">{{ step.sub }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Step {
  label: string
  sub?: string
  icon?: string
  color?: string
}

const props = defineProps<{
  steps: Step[]
}>()

function stepClass(color?: string): string {
  const map: Record<string, string> = {
    purple: 'border-violet-500 bg-violet-500/15 text-violet-200',
    teal: 'border-teal-500 bg-teal-500/10 text-teal-200',
    amber: 'border-amber-500 bg-amber-500/10 text-amber-200',
    blue: 'border-blue-500 bg-blue-500/10 text-blue-200',
    green: 'border-emerald-500 bg-emerald-500/10 text-emerald-200',
    red: 'border-red-500 bg-red-500/10 text-red-200',
    gray: 'border-gray-600 bg-gray-800 text-gray-300',
  }
  return map[color ?? 'gray'] || map.gray
}
</script>
