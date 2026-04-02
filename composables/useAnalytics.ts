export function useAnalytics() {
  function track(event: string, props?: Record<string, string | number>) {
    if (typeof window !== 'undefined' && 'plausible' in window) {
      ;(window as any).plausible(event, { props })
    }
  }
  return { track }
}
