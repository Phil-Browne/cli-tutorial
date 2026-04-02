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
        <TutorialTutorialHeader
          :title="page.title"
          :description="page.description"
          :duration="page.duration"
          :difficulty="page.difficulty"
          :audience="page.audience"
          :prerequisites="page.prerequisites"
        />

        <!-- Markdown content -->
        <ContentRenderer :value="page" class="prose dark:prose-invert" />

        <!-- Prev / Next navigation -->
        <TutorialTutorialNav :prev="prev" :next="next" />
      </article>

      <!-- Sticky table of contents (xl+) -->
      <TutorialTableOfContents />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Fetch the current page content
const { data: page } = await useAsyncData(`content-${route.path}`, () =>
  queryContent(route.path).findOne().catch(() => null)
)

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
