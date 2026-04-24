<template>
  <nav class="space-y-1">
    <div v-for="section in sections" :key="section._path ?? section.title">
      <!-- Section header — clickable to toggle children -->
      <button
        class="flex items-center justify-between w-full px-2 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors"
        :class="
          isSectionActive(section)
            ? 'text-violet-400 bg-gray-800/40'
            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
        "
        :aria-expanded="isExpanded(section)"
        @click="toggle(section)"
      >
        <span>{{ section.title }}</span>
        <svg
          class="w-3.5 h-3.5 shrink-0 transition-transform duration-200"
          :class="{ 'rotate-90': isExpanded(section) }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <!-- Collapsible children -->
      <Transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <ul v-show="isExpanded(section)" class="space-y-0.5 mt-0.5 ml-1">
          <li v-for="item in section.children ?? []" :key="item._path">
            <NuxtLink
              :to="item._path"
              :ref="
                (el) => {
                  if (item._path !== route.path) return;
                  const candidate =
                    (el as { $el?: unknown } | null)?.$el ?? el;
                  activeRef = candidate as Element | null;
                }
              "
              :aria-current="item._path === route.path ? 'page' : undefined"
              class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              active-class="text-violet-400 bg-gray-800/60 font-medium"
              @click="emit('navigate')"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface NavItem {
  title: string;
  _path?: string;
  children?: NavItem[];
}

const props = defineProps<{
  navigation?: NavItem[] | null;
}>();

const emit = defineEmits<{
  navigate: [];
}>();

const route = useRoute();
let activeRef: Element | null = null;

// Track which sections are expanded
const expandedSections = ref<Set<string>>(new Set());

function sectionKey(section: NavItem): string {
  return section._path ?? section.title;
}

function isSectionActive(section: NavItem): boolean {
  return (section.children ?? []).some((c) => c._path === route.path);
}

function isExpanded(section: NavItem): boolean {
  return expandedSections.value.has(sectionKey(section));
}

function toggle(section: NavItem): void {
  const key = sectionKey(section);
  const updated = new Set(expandedSections.value);
  if (updated.has(key)) {
    updated.delete(key);
  } else {
    updated.add(key);
  }
  expandedSections.value = updated;
}

// Auto-expand the section containing the current page
function autoExpandActive() {
  if (!props.navigation) return;
  for (const section of props.navigation) {
    if (isSectionActive(section)) {
      expandedSections.value.add(sectionKey(section));
    }
  }
}

// Expand active section on mount and route change
watch(() => route.path, autoExpandActive, { immediate: true });
watch(() => props.navigation, autoExpandActive);

// Slide transition helpers
function beforeEnter(el: Element) {
  const htmlEl = el as HTMLElement;
  htmlEl.style.height = '0';
  htmlEl.style.overflow = 'hidden';
}
function enter(el: Element) {
  const htmlEl = el as HTMLElement;
  htmlEl.style.height = htmlEl.scrollHeight + 'px';
}
function afterEnter(el: Element) {
  const htmlEl = el as HTMLElement;
  htmlEl.style.height = '';
  htmlEl.style.overflow = '';
}
function beforeLeave(el: Element) {
  const htmlEl = el as HTMLElement;
  htmlEl.style.height = htmlEl.scrollHeight + 'px';
  htmlEl.style.overflow = 'hidden';
}
function leave(el: Element) {
  const htmlEl = el as HTMLElement;
  // Force reflow so the browser sees the starting height
  htmlEl.offsetHeight; // eslint-disable-line @typescript-eslint/no-unused-expressions
  htmlEl.style.height = '0';
}

function scrollIntoViewIfSupported(target: Element | null) {
  if (!target) return;
  const maybeElement = target as Element & {
    scrollIntoView?: (options?: ScrollIntoViewOptions) => void;
  };
  if (typeof maybeElement.scrollIntoView !== 'function') return;
  maybeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// Scroll active link into view when route changes
watch(
  () => route.path,
  async () => {
    await nextTick();
    scrollIntoViewIfSupported(activeRef);
  },
  { immediate: true },
);

// Strip numeric prefixes from directory titles
function formatTitle(title: string): string {
  return title
    .replace(/^\d+\.\s*/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

const sections = computed(() => {
  if (!props.navigation) return [];
  return props.navigation.map((section) => ({
    ...section,
    title: section.title ?? formatTitle(section._path?.split('/').pop() ?? ''),
  }));
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: height 0.2s ease;
}
</style>
