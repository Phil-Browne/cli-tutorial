import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import AudienceToggle from '~/components/ui/AudienceToggle.vue'

describe('AudienceToggle keyboard interaction', () => {
  it('buttons are focusable', async () => {
    const wrapper = await mountSuspended(AudienceToggle)
    const buttons = wrapper.findAll('button')
    // Buttons should be present and not have tabindex=-1
    expect(buttons[0].attributes('tabindex')).not.toBe('-1')
    expect(buttons[1].attributes('tabindex')).not.toBe('-1')
  })

  it('switches on Enter key via click event', async () => {
    const wrapper = await mountSuspended(AudienceToggle)
    const buttons = wrapper.findAll('button')

    // Trigger click on Sales button (simulates Enter key on focused button)
    await buttons[1].trigger('click')

    expect(buttons[1].classes()).toContain('bg-gray-950')
    expect(buttons[0].classes()).not.toContain('bg-gray-950')
  })

  it('toggles back to first option', async () => {
    const wrapper = await mountSuspended(AudienceToggle)
    const buttons = wrapper.findAll('button')

    // Click Sales, then back to SA
    await buttons[1].trigger('click')
    await buttons[0].trigger('click')

    expect(buttons[0].classes()).toContain('bg-gray-950')
    expect(buttons[1].classes()).not.toContain('bg-gray-950')
  })
})
