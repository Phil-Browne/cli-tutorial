const STORAGE_KEY = 'megaport_tutorial_progress'

interface ProgressState {
  completed: string[] // array of page _path values
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.completed)) return parsed
    }
  } catch { /* ignore corrupt data */ }
  return { completed: [] }
}

function save(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch { /* storage full or blocked */ }
}

const state = ref<ProgressState>(load())

export function useProgress() {
  function isCompleted(path: string): boolean {
    return state.value.completed.includes(path)
  }

  function markCompleted(path: string) {
    if (!state.value.completed.includes(path)) {
      state.value = { completed: [...state.value.completed, path] }
      save(state.value)
    }
  }

  function markIncomplete(path: string) {
    state.value = { completed: state.value.completed.filter(p => p !== path) }
    save(state.value)
  }

  function completedCount(paths: string[]): number {
    return paths.filter(p => state.value.completed.includes(p)).length
  }

  function resetAll() {
    state.value = { completed: [] }
    save(state.value)
  }

  return { isCompleted, markCompleted, markIncomplete, completedCount, resetAll }
}
