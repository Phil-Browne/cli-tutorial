<template>
  <nav v-if="crumbs.length > 1" class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list">
      <li v-for="(crumb, i) in crumbs" :key="crumb.path" class="breadcrumbs-item">
        <span v-if="i > 0" class="breadcrumbs-sep" aria-hidden="true">/</span>
        <NuxtLink
          v-if="i < crumbs.length - 1"
          :to="crumb.path"
          class="breadcrumbs-link"
        >{{ crumb.label }}</NuxtLink>
        <span v-else class="breadcrumbs-current" aria-current="page">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const SECTION_LABELS: Record<string, string> = {
  'getting-started': 'Getting Started',
  'core-concepts': 'Core Concepts',
  'tutorials': 'Tutorials',
  'demos': 'Live Demo',
  'reference': 'Reference',
}

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  if (segments.length === 0) return []

  const result = [{ path: '/', label: 'Home' }]

  let accumulated = ''
  for (const segment of segments) {
    accumulated += '/' + segment
    // Strip leading numbers from segment (e.g. "1.port-lifecycle" → "port-lifecycle")
    const clean = segment.replace(/^\d+\./, '')
    // Look up in section map, or title-case the segment
    const label = SECTION_LABELS[clean] ?? clean
      .split('-')
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    result.push({ path: accumulated, label })
  }

  return result
})
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 1.25rem;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumbs-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.breadcrumbs-sep {
  color: #4b5563;
  font-size: 0.8125rem;
}

.breadcrumbs-link {
  font-size: 0.8125rem;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.15s;
}

.breadcrumbs-link:hover {
  color: #d1d5db;
}

.breadcrumbs-current {
  font-size: 0.8125rem;
  color: #9ca3af;
}
</style>
