<template>
  <nav class="space-y-5">
    <div v-for="section in sections" :key="section._path ?? section.title">
      <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 px-2 mb-2">
        {{ section.title }}
      </p>
      <ul class="space-y-0.5">
        <li v-for="item in section.children ?? []" :key="item._path">
          <NuxtLink
            :to="item._path"
            class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            active-class="text-violet-400 bg-gray-800/60 font-medium"
            @click="emit('navigate')"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface NavItem {
  title: string
  _path?: string
  children?: NavItem[]
}

const props = defineProps<{
  navigation?: NavItem[] | null
}>()

const emit = defineEmits<{
  navigate: []
}>()

// Strip numeric prefixes from directory titles (e.g. "0.getting-started" → "Getting Started")
function formatTitle(title: string): string {
  return title.replace(/^\d+\.\s*/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const sections = computed(() => {
  if (!props.navigation) return []
  return props.navigation.map(section => ({
    ...section,
    title: section.title ?? formatTitle(section._path?.split('/').pop() ?? ''),
  }))
})
</script>
