import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import AudienceToggle from '~/components/ui/AudienceToggle.vue'

describe('AudienceToggle', () => {
  it('renders two audience buttons', async () => {
    const wrapper = await mountSuspended(AudienceToggle)
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Solutions Architect')
    expect(buttons[1].text()).toBe('Sales')
  })

  it('defaults to Solutions Architect selected', async () => {
    const wrapper = await mountSuspended(AudienceToggle)
    const buttons = wrapper.findAll('button')
    // Active button has the active classes (bg-gray-950 text-white)
    expect(buttons[0].classes()).toContain('bg-gray-950')
    expect(buttons[1].classes()).not.toContain('bg-gray-950')
  })

  it('switches selection when Sales button is clicked', async () => {
    const wrapper = await mountSuspended(AudienceToggle)
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(buttons[1].classes()).toContain('bg-gray-950')
    expect(buttons[0].classes()).not.toContain('bg-gray-950')
  })
})
