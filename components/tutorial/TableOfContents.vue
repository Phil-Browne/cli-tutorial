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

    <div v-if="isTutorialIndex" class="mt-5 pt-4 border-t border-gray-800">
      <p
        class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2"
      >
        Tutorials
      </p>
      <ul class="space-y-1 border-l border-gray-800">
        <li v-for="item in tutorialLinks" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="block pl-3 py-1 text-sm transition-colors border-l-2 -ml-px border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div v-if="isCoreConceptsIndex" class="mt-5 pt-4 border-t border-gray-800">
      <p
        class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2"
      >
        Core Concepts
      </p>
      <ul class="space-y-1 border-l border-gray-800">
        <li v-for="item in coreConceptLinks" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="block pl-3 py-1 text-sm transition-colors border-l-2 -ml-px border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div v-if="isReferenceIndex" class="mt-5 pt-4 border-t border-gray-800">
      <p
        class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2"
      >
        Command Groups
      </p>
      <ul class="space-y-1 border-l border-gray-800">
        <li v-for="item in referenceCommandGroupLinks" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="block pl-3 py-1 text-sm transition-colors border-l-2 -ml-px border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
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

const isTutorialIndex = computed(() => route.path === '/tutorials');
const isCoreConceptsIndex = computed(() => route.path === '/core-concepts');
const isReferenceIndex = computed(() => route.path === '/reference');

const tutorialLinks = [
  { label: 'Port Lifecycle', to: '/tutorials/port-lifecycle' },
  { label: 'Connect to AWS', to: '/tutorials/connect-aws' },
  { label: 'Connect to Azure', to: '/tutorials/connect-azure' },
  { label: 'MCR Routing', to: '/tutorials/mcr-routing' },
  { label: 'Multi-Cloud', to: '/tutorials/multi-cloud' },
  { label: 'Automation', to: '/tutorials/automation' },
];

const coreConceptLinks = [
  { label: 'Resource Types', to: '/core-concepts/resource-types' },
  { label: 'Input Modes', to: '/core-concepts/input-modes' },
  { label: 'Output Formats', to: '/core-concepts/output-formats' },
  { label: 'Config Profiles', to: '/core-concepts/config-profiles' },
];

const referenceCommandGroupLinks = [
  { label: 'Apply', to: '/reference/command-reference#apply' },
  { label: 'Ports', to: '/reference/command-reference#ports' },
  { label: 'VXC', to: '/reference/command-reference#vxc' },
  { label: 'MCR', to: '/reference/command-reference#mcr' },
  { label: 'MVE', to: '/reference/command-reference#mve' },
  { label: 'IX', to: '/reference/command-reference#ix' },
  { label: 'Product', to: '/reference/command-reference#product' },
  { label: 'Locations', to: '/reference/command-reference#locations' },
  { label: 'Partners', to: '/reference/command-reference#partners' },
  { label: 'Service Keys', to: '/reference/command-reference#service-keys' },
  { label: 'Users', to: '/reference/command-reference#users' },
  {
    label: 'Managed Account',
    to: '/reference/command-reference#managed-account',
  },
  { label: 'Config', to: '/reference/command-reference#config' },
  { label: 'Topology', to: '/reference/command-reference#topology' },
  {
    label: 'Billing Market',
    to: '/reference/command-reference#billing-market',
  },
  { label: 'Status', to: '/reference/command-reference#status' },
  { label: 'Completion', to: '/reference/command-reference#completion' },
  { label: 'Version', to: '/reference/command-reference#version' },
];

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
