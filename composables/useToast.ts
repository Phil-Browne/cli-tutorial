interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

let nextId = 0
const toasts = ref<Toast[]>([])

export function useToast() {
  function show(message: string, type: Toast['type'] = 'success', duration = 2500) {
    const id = nextId++
    toasts.value = [...toasts.value, { id, message, type }]
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  return { toasts: readonly(toasts), show }
}
