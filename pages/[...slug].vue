<template>
  <div>
    <!-- Not found state -->
    <div v-if="!page" class="py-12 text-center max-w-xl mx-auto">
      <p class="text-6xl mb-6">🔍</p>
      <h1 class="text-3xl font-bold text-white mb-4">Page Not Found</h1>
      <p class="text-gray-400 mb-8">This tutorial page doesn't exist yet. Check back soon.</p>
      <NuxtLink to="/" class="text-violet-400 hover:text-violet-300 underline">
        Back to home
      </NuxtLink>
    </div>

    <!-- Content layout: prose + TOC -->
    <div v-else class="flex gap-10 max-w-5xl">
      <!-- Main article -->
      <article class="flex-1 min-w-0">
        <!-- Tutorial header from frontmatter -->
        <TutorialHeader
          :title="page.title"
          :description="page.description"
          :duration="page.duration"
          :difficulty="page.difficulty"
          :audience="page.audience"
          :prerequisites="page.prerequisites"
        />

        <!-- Markdown content -->
        <ContentRenderer :value="page" class="prose dark:prose-invert" />

        <!-- Child page cards for section index pages -->
        <div v-if="childPages && childPages.length > 0" class="mt-10">
          <h2 class="text-lg font-semibold text-white mb-4">In this section</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NuxtLink
              v-for="child in childPages"
              :key="child._path"
              :to="child._path"
              class="group block rounded-lg border border-gray-800 bg-gray-900 p-4 hover:border-violet-500 hover:bg-gray-800/60 transition-colors"
            >
              <p class="font-medium text-white group-hover:text-violet-400 transition-colors">{{ child.title }}</p>
              <p v-if="child.description" class="mt-1 text-sm text-gray-400 line-clamp-2">{{ child.description }}</p>
            </NuxtLink>
          </div>
        </div>

        <!-- Prev / Next navigation -->
        <TutorialNav :prev="prev" :next="next" />
      </article>

      <!-- Sticky table of contents (xl+) -->
      <TableOfContents />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Fetch the current page content — exact path, skip partials (_dir.yml etc.)
const { data: page } = await useAsyncData(`content-${route.path}`, () =>
  queryContent()
    .where({ _path: route.path, _partial: { $ne: true } })
    .findOne()
    .catch(() => null)
)

// Fetch child pages when on a section index (single path segment, e.g. /tutorials)
const isSectionIndex = computed(() => route.path.split('/').filter(Boolean).length === 1)

const { data: childPages } = await useAsyncData(`children-${route.path}`, () => {
  if (!isSectionIndex.value) return Promise.resolve(null)
  return queryContent()
    .where({ _path: { $contains: route.path }, _partial: { $ne: true } })
    .where({ _path: { $ne: route.path } })
    .sort({ _file: 1 })
    .find()
    .catch(() => null)
})

// Fetch full navigation to derive prev/next
const { data: navigation } = await useAsyncData('nav', () =>
  fetchContentNavigation()
)

// Flatten nav tree to ordered list of { title, _path } items
function flattenNav(items: any[]): { title: string; _path: string }[] {
  return items.flatMap(item => [
    ...(item._path ? [{ title: item.title, _path: item._path }] : []),
    ...(item.children ? flattenNav(item.children) : []),
  ])
}

const flatNav = computed(() => flattenNav(navigation.value ?? []))

const currentIndex = computed(() =>
  flatNav.value.findIndex(item => item._path === route.path)
)

const prev = computed(() => {
  const item = flatNav.value[currentIndex.value - 1]
  return item ? { title: item.title, path: item._path } : undefined
})

const next = computed(() => {
  const item = flatNav.value[currentIndex.value + 1]
  return item ? { title: item.title, path: item._path } : undefined
})
</script>
