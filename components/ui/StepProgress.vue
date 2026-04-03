<template>
  <div class="my-6">
    <div
      class="relative grid gap-6"
      :style="{
        gridTemplateColumns: `repeat(${normalizedSteps.length}, minmax(0, 1fr))`,
      }"
    >
      <!-- Base connector runs center-to-center for first/last steps -->
      <div
        v-if="normalizedSteps.length > 1"
        class="absolute top-4 h-0.5 bg-gray-700"
        :style="connectorTrackStyle"
      />
      <!-- Progress connector overlays completed portion -->
      <div
        v-if="normalizedSteps.length > 1"
        class="absolute top-4 h-0.5 bg-violet-600 transition-all duration-300"
        :style="connectorProgressStyle"
      />

      <div
        v-for="(step, i) in normalizedSteps"
        :key="i"
        class="relative z-10 flex flex-col items-center"
      >
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors border-2"
          :class="stepClass(i)"
        >
          <svg
            v-if="i < current - 1"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <span
          v-if="step"
          class="mt-2 text-xs text-center max-w-24 leading-tight"
          :class="
            i === current - 1
              ? 'text-violet-400 font-medium'
              : i < current - 1
                ? 'text-gray-400'
                : 'text-gray-600'
          "
        >
          {{ step }}
        </span>
      </div>
    </div>

    <!-- Counter label -->
    <p class="mt-2 text-xs text-gray-500 text-center">
      Step {{ current }} of {{ total }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  current: number;
  total: number;
  steps?: string[];
}>();

const normalizedSteps = computed(() =>
  props.steps?.length === props.total
    ? props.steps
    : Array.from({ length: props.total }, (_, i) => props.steps?.[i] ?? ''),
);

const connectorInsetPercent = computed(() => 50 / props.total);

const connectorTrackStyle = computed(() => ({
  left: `${connectorInsetPercent.value}%`,
  right: `${connectorInsetPercent.value}%`,
}));

const connectorProgressStyle = computed(() => {
  if (props.total <= 1) {
    return {
      left: `${connectorInsetPercent.value}%`,
      width: '0%',
    };
  }
  const progress = Math.max(0, Math.min(props.current - 1, props.total - 1));
  const trackWidth = 100 - connectorInsetPercent.value * 2;
  const width = (progress / (props.total - 1)) * trackWidth;
  return {
    left: `${connectorInsetPercent.value}%`,
    width: `${width}%`,
  };
});

function stepClass(index: number) {
  if (index < props.current - 1)
    return 'border-violet-600 bg-violet-600 text-white';
  if (index === props.current - 1)
    return 'border-violet-500 bg-gray-950 text-violet-400';
  return 'border-gray-700 bg-gray-900 text-gray-600';
}
</script>
