<template>
  <div>
    <!-- Error state (query failed, distinct from not found) -->
    <div v-if="queryError" class="py-12 text-center max-w-xl mx-auto">
      <p class="text-6xl mb-6" aria-hidden="true">⚠️</p>
      <h1 class="text-3xl font-bold text-white mb-4">Something went wrong</h1>
      <p class="text-gray-400 mb-8">Unable to load this page. Try refreshing.</p>
      <button
        class="text-violet-400 hover:text-violet-300 underline"
        @click="() => window.location.reload()"
      >
        Refresh page
      </button>
    </div>

    <!-- Not found state -->
    <div v-else-if="!page" class="py-12 text-center max-w-xl mx-auto">
      <p class="text-6xl mb-6" aria-hidden="true">🔍</p>
      <h1 class="text-3xl font-bold text-white mb-4">Page Not Found</h1>
      <p class="text-gray-400 mb-8">This tutorial page doesn't exist yet. Check back soon.</p>
      <NuxtLink to="/" class="text-violet-400 hover:text-violet-300 underline">
        Back to home
      </NuxtLink>
    </div>

    <!-- Content layout: prose + TOC -->
    <div v-else-if="page" class="flex gap-10" :class="page.wideLayout ? 'max-w-7xl' : 'max-w-5xl'">
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

        <!-- Progress tracking -->
        <ClientOnly>
          <ProgressToggle :path="route.path" />
        </ClientOnly>

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

const queryError = ref(false)

// Fetch the current page content — exact path, skip partials (_dir.yml etc.)
const { data: page } = await useAsyncData(`content-${route.path}`, () =>
  queryContent()
    .where({ _path: route.path, _partial: { $ne: true } })
    .findOne()
    .catch((err) => {
      // Distinguish actual errors from "not found" (findOne rejects when no match)
      if (err?.statusCode !== 404 && err?.message !== 'Not Found') {
        queryError.value = true
      }
      return null
    })
)

// Set page-specific title, description, and canonical URL for SEO
const siteUrl = 'https://cli-tutorial.megaport.com'
useHead(computed(() => ({
  title: page.value?.title
    ? `${page.value.title} — Megaport CLI`
    : 'Megaport CLI',
  meta: page.value?.description
    ? [{ name: 'description', content: page.value.description }]
    : [],
  link: [
    { rel: 'canonical', href: `${siteUrl}${route.path}` },
  ],
})))

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

// Fetch all pages for prev/next navigation (ordered by file path to respect numeric prefixes)
const { data: allPages } = await useAsyncData('all-pages', () =>
  queryContent()
    .where({ _partial: { $ne: true } })
    .only(['title', '_path', '_file'])
    .sort({ _file: 1 })
    .find()
    .catch(() => null)
)

// Filter to only leaf pages (exclude section index pages which have single-segment paths)
const navPages = computed(() =>
  (allPages.value ?? []).filter(p => (p._path?.split('/').filter(Boolean).length ?? 0) > 1)
)

const currentIndex = computed(() =>
  navPages.value.findIndex(item => item._path === route.path)
)

const prev = computed(() => {
  if (currentIndex.value < 0) return undefined
  const item = navPages.value[currentIndex.value - 1]
  return item ? { title: item.title, path: item._path } : undefined
})

const next = computed(() => {
  // On section index pages, link to the first child in this section
  if (currentIndex.value < 0 && isSectionIndex.value) {
    const firstChild = navPages.value.find(p => p._path?.startsWith(route.path + '/'))
    return firstChild ? { title: firstChild.title, path: firstChild._path } : undefined
  }
  if (currentIndex.value < 0) return undefined
  const item = navPages.value[currentIndex.value + 1]
  return item ? { title: item.title, path: item._path } : undefined
})
</script>
