<template>
  <div class="my-8 flex flex-col items-center gap-3">
    <!-- Main flow -->
    <div class="flex items-center gap-3 flex-wrap justify-center">
      <Node label="ports buy" color="gray" small />
      <Arrow />
      <Node label="CONFIGURED" color="purple" />
      <Arrow label="fabric provisioning" />
      <Node label="LIVE" color="green" />
      <Arrow label="ports delete" />
      <Node label="DECOMMISSIONING" color="amber" />
      <Arrow label="billing period ends" />
      <Node label="DECOMMISSIONED" color="red" />
    </div>

    <!-- Branch paths -->
    <div class="flex items-center gap-6 flex-wrap justify-center mt-2">
      <div class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900/50">
        <span class="text-xs text-gray-400">From</span>
        <span class="text-xs font-semibold text-violet-400">CONFIGURED</span>
        <span class="text-gray-600">→</span>
        <span class="text-xs font-semibold text-gray-400">CANCELLED</span>
        <span class="text-xs text-gray-500 ml-1">delete before going live</span>
      </div>
      <div class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900/50">
        <span class="text-xs text-gray-400">From</span>
        <span class="text-xs font-semibold text-amber-400">DECOMMISSIONING</span>
        <span class="text-gray-600">→</span>
        <span class="text-xs font-semibold text-violet-400">CONFIGURED</span>
        <span class="text-xs text-gray-500 ml-1">restore within window</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Inline sub-components
const Node = defineComponent({
  props: {
    label: { type: String, required: true },
    color: { type: String, default: 'gray' },
    small: { type: Boolean, default: false },
  },
  setup(props) {
    const colors: Record<string, string> = {
      purple: 'border-violet-500 bg-violet-500/15 text-violet-300',
      green: 'border-emerald-500 bg-emerald-500/15 text-emerald-300',
      amber: 'border-amber-500 bg-amber-500/15 text-amber-300',
      red: 'border-red-500 bg-red-500/15 text-red-300',
      gray: 'border-gray-600 bg-gray-800 text-gray-400',
    }
    return () =>
      h('div', {
        class: [
          'rounded-lg border-2 font-semibold text-center whitespace-nowrap',
          colors[props.color] || colors.gray,
          props.small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm',
        ],
      }, props.label)
  },
})

const Arrow = defineComponent({
  props: {
    label: { type: String, default: '' },
  },
  setup(props) {
    return () =>
      h('div', { class: 'flex flex-col items-center gap-0.5 shrink-0' }, [
        props.label
          ? h('span', { class: 'text-[10px] text-gray-500 whitespace-nowrap' }, props.label)
          : null,
        h('span', { class: 'text-gray-500 text-lg' }, '→'),
      ])
  },
})
</script>
