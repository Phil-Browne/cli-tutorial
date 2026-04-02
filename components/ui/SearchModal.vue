<template>
  <Teleport to="body">
    <Transition name="search-fade">
      <div
        v-if="modelValue"
        class="search-backdrop"
        @click.self="close"
        @keydown.escape="close"
      >
        <div class="search-modal" role="dialog" aria-modal="true" aria-label="Search">
          <!-- Input row -->
          <div class="search-input-row">
            <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              class="search-input"
              type="text"
              placeholder="Search docs…"
              autocomplete="off"
              spellcheck="false"
              @keydown.up.prevent="moveSelection(-1)"
              @keydown.down.prevent="moveSelection(1)"
              @keydown.enter.prevent="selectCurrent"
              @keydown.escape="close"
            />
            <kbd class="search-esc-key">Esc</kbd>
          </div>

          <!-- Results / recents -->
          <div class="search-body" ref="resultsRef">
            <!-- Loading -->
            <div v-if="loading" class="search-empty">Loading…</div>

            <!-- Search results -->
            <template v-else-if="query.trim()">
              <div v-if="results.length === 0" class="search-empty">No results for "{{ query }}"</div>
              <template v-else>
                <div
                  v-for="(group, section) in groupedResults"
                  :key="section"
                  class="search-group"
                >
                  <div class="search-group-label">{{ section }}</div>
                  <button
                    v-for="(item, i) in group"
                    :key="item._path"
                    class="search-result"
                    :class="{ 'search-result--active': flatIndex(section, i) === selectedIndex }"
                    @click="navigate(item._path)"
                    @mouseenter="selectedIndex = flatIndex(section, i)"
                  >
                    <span class="search-result-title">{{ item.title }}</span>
                    <span v-if="item.description" class="search-result-desc">
                      {{ item.description.slice(0, 90) }}{{ item.description.length > 90 ? '…' : '' }}
                    </span>
                  </button>
                </div>
              </template>
            </template>

            <!-- Recent searches (shown when query is empty) -->
            <template v-else>
              <div v-if="recentSearches.length" class="search-group">
                <div class="search-group-label">Recent</div>
                <div
                  v-for="(item, i) in recentSearches"
                  :key="item._path"
                  class="search-result search-result--recent"
                  :class="{ 'search-result--active': i === selectedIndex }"
                  @click="navigate(item._path)"
                  @mouseenter="selectedIndex = i"
                >
                  <svg class="search-recent-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="search-result-title">{{ item.title }}</span>
                  <button
                    class="search-recent-remove"
                    aria-label="Remove"
                    @click.stop="removeRecent(item._path)"
                  >×</button>
                </div>
              </div>
              <div v-else class="search-empty">Type to search…</div>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { track } = useAnalytics()

interface Doc {
  _path: string
  title: string
  description?: string
}

// Module-level cache — only fetched once per session
let docsCache: Doc[] | null = null
let fuseInstance: Fuse<Doc> | null = null

const query = ref('')
const loading = ref(false)
const results = ref<Doc[]>([])
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

// Recent searches — persisted in localStorage
const RECENT_KEY = 'megaport-recent-searches'
const MAX_RECENT = 5

const recentSearches = ref<Doc[]>([])

function loadRecent() {
  if (typeof window === 'undefined') return
  try {
    recentSearches.value = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')
  } catch {
    recentSearches.value = []
  }
}

function saveRecent(doc: Doc) {
  const existing = recentSearches.value.filter(r => r._path !== doc._path)
  recentSearches.value = [doc, ...existing].slice(0, MAX_RECENT)
  localStorage.setItem(RECENT_KEY, JSON.stringify(recentSearches.value))
}

function removeRecent(path: string) {
  recentSearches.value = recentSearches.value.filter(r => r._path !== path)
  localStorage.setItem(RECENT_KEY, JSON.stringify(recentSearches.value))
}

// Section label map
const SECTION_LABELS: Record<string, string> = {
  'getting-started': 'Getting Started',
  'core-concepts': 'Core Concepts',
  'tutorials': 'Tutorials',
  'demos': 'Live Demo',
  'reference': 'Reference',
}

function sectionFor(path: string): string {
  const segment = path.split('/').filter(Boolean)[0] ?? ''
  return SECTION_LABELS[segment] ?? 'Other'
}

const groupedResults = computed(() => {
  const groups: Record<string, Doc[]> = {}
  for (const r of results.value) {
    const section = sectionFor(r._path)
    if (!groups[section]) groups[section] = []
    groups[section].push(r)
  }
  return groups
})

// Flat index mapping for keyboard navigation
function flatIndex(section: string, i: number): number {
  let offset = 0
  for (const [s, items] of Object.entries(groupedResults.value)) {
    if (s === section) return offset + i
    offset += items.length
  }
  return i
}

const totalResultCount = computed(() => results.value.length)

async function loadDocs() {
  if (docsCache) return
  loading.value = true
  try {
    const docs = await queryContent().only(['_path', 'title', 'description']).find()
    docsCache = (docs as Doc[]).filter(d => d._path !== '/')
    fuseInstance = new Fuse(docsCache, {
      keys: ['title', 'description'],
      threshold: 0.35,
      includeMatches: true,
    })
  } finally {
    loading.value = false
  }
}

watch(query, (q) => {
  selectedIndex.value = 0
  if (!q.trim()) {
    results.value = []
    return
  }
  if (!fuseInstance) return
  results.value = fuseInstance.search(q).map(r => r.item).slice(0, 20)
})

watch(() => props.modelValue, async (open) => {
  if (open) {
    loadRecent()
    await loadDocs()
    await nextTick()
    inputRef.value?.focus()
    query.value = ''
    selectedIndex.value = 0
  }
})

function close() {
  emit('update:modelValue', false)
}

function navigate(path: string) {
  const doc = docsCache?.find(d => d._path === path) ?? recentSearches.value.find(r => r._path === path)
  if (doc) saveRecent(doc)
  if (query.value.trim()) {
    track('Search Query', { query: query.value.trim() })
  }
  navigateTo(path)
  close()
}

function moveSelection(delta: number) {
  const max = query.trim() ? totalResultCount.value : recentSearches.value.length
  selectedIndex.value = Math.max(0, Math.min(max - 1, selectedIndex.value + delta))
}

function selectCurrent() {
  if (query.value.trim()) {
    const flat = results.value
    if (flat[selectedIndex.value]) navigate(flat[selectedIndex.value]._path)
  } else {
    if (recentSearches.value[selectedIndex.value]) {
      navigate(recentSearches.value[selectedIndex.value]._path)
    }
  }
}
</script>

<style scoped>
.search-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
}

.search-modal {
  width: 100%;
  max-width: 600px;
  margin: 0 1rem;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.search-input-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid #1f2937;
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #6b7280;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #f3f4f6;
  caret-color: #7c3aed;
}

.search-input::placeholder {
  color: #6b7280;
}

.search-esc-key {
  font-size: 0.6875rem;
  color: #6b7280;
  border: 1px solid #374151;
  border-radius: 4px;
  padding: 0.125rem 0.375rem;
  font-family: ui-monospace, monospace;
  flex-shrink: 0;
}

.search-body {
  max-height: 420px;
  overflow-y: auto;
  padding: 0.5rem;
}

.search-empty {
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.search-group {
  margin-bottom: 0.25rem;
}

.search-group-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b7280;
  padding: 0.5rem 0.75rem 0.25rem;
}

.search-result {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.1s;
  border: none;
  background: transparent;
}

.search-result--active {
  background: #1f2937;
}

.search-result--recent {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.search-result-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #e5e7eb;
}

.search-result-desc {
  font-size: 0.8125rem;
  color: #9ca3af;
  line-height: 1.4;
}

.search-recent-icon {
  width: 14px;
  height: 14px;
  color: #6b7280;
  flex-shrink: 0;
}

.search-recent-remove {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #6b7280;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.25rem;
  border-radius: 4px;
  flex-shrink: 0;
}

.search-recent-remove:hover {
  color: #d1d5db;
}

/* Transitions */
.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.15s ease;
}

.search-fade-enter-from,
.search-fade-leave-to {
  opacity: 0;
}
</style>
