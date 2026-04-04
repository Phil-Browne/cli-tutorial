export function useAnalytics() {
  function track(event: string, props?: Record<string, string | number>) {
    if (typeof window !== 'undefined' && typeof (window as any).plausible === 'function') {
      ;(window as any).plausible(event, { props })
    }
  }
  return { track }
}
