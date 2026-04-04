import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAnalytics } from '~/composables/useAnalytics'

describe('useAnalytics', () => {
  let originalPlausible: any

  beforeEach(() => {
    originalPlausible = (window as any).plausible
  })

  afterEach(() => {
    if (originalPlausible !== undefined) {
      (window as any).plausible = originalPlausible
    } else {
      delete (window as any).plausible
    }
  })

  it('does not throw when plausible is not loaded', () => {
    delete (window as any).plausible
    const { track } = useAnalytics()
    expect(() => track('Test Event')).not.toThrow()
  })

  it('does not throw when plausible is not a function', () => {
    ;(window as any).plausible = 'not a function'
    const { track } = useAnalytics()
    expect(() => track('Test Event')).not.toThrow()
  })

  it('calls window.plausible with event name and props when available', () => {
    const mockPlausible = vi.fn()
    ;(window as any).plausible = mockPlausible
    const { track } = useAnalytics()

    track('Copy Command', { command: 'megaport-cli ports list' })

    expect(mockPlausible).toHaveBeenCalledWith('Copy Command', {
      props: { command: 'megaport-cli ports list' },
    })
  })

  it('calls window.plausible without props when none provided', () => {
    const mockPlausible = vi.fn()
    ;(window as any).plausible = mockPlausible
    const { track } = useAnalytics()

    track('Page View')

    expect(mockPlausible).toHaveBeenCalledWith('Page View', { props: undefined })
  })
})
