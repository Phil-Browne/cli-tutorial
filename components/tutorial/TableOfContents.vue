<template>
  <nav
    v-if="links.length"
    class="hidden lg:block sticky top-20 w-56 shrink-0 ml-8 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-2"
  >
    <p
      class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3"
    >
      On this page
    </p>
    <ul class="space-y-1 border-l border-gray-800">
      <li v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="block pl-3 py-1 text-sm transition-colors border-l-2 -ml-px"
          :class="[
            activeId === link.id
              ? 'border-violet-500 text-violet-400 font-medium'
              : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600',
          ]"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

// Get TOC from @nuxt/content — route-specific key so it refreshes on navigation
const route = useRoute();
const { data: page } = useAsyncData(`toc-${route.path}`, () =>
  queryContent()
    .where({ _path: route.path, _partial: { $ne: true } })
    .findOne(),
);

const links = computed(() => {
  // Only top-level h2 entries — keeps TOC short and scannable on long pages
  return page.value?.body?.toc?.links ?? [];
});

const activeId = ref('');

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // Use explicit offset to reliably clear the fixed header (64px) + buffer
  window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
}

function observeHeadings() {
  document.querySelectorAll('h2[id]').forEach((el) => observer?.observe(el));
}

// IntersectionObserver to track active heading
let observer: IntersectionObserver | null = null;
let mutationObserver: MutationObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      }
    },
    { rootMargin: '-64px 0px -60% 0px', threshold: 0 },
  );

  observeHeadings();

  // Re-scan headings when content renders asynchronously (SPA mode)
  const content = document.getElementById('main-content');
  if (content) {
    mutationObserver = new MutationObserver(() => observeHeadings());
    mutationObserver.observe(content, { childList: true, subtree: true });
  }
});

onUnmounted(() => {
  observer?.disconnect();
  mutationObserver?.disconnect();
});
</script>
