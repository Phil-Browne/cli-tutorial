import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CommandExample from '~/components/ui/CommandExample.vue'

describe('CommandExample', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    })
  })

  it('renders the command string', async () => {
    const wrapper = await mountSuspended(CommandExample, {
      props: { command: 'megaport-cli ports list' },
    })
    expect(wrapper.text()).toContain('megaport-cli ports list')
  })

  it('shows description when provided', async () => {
    const wrapper = await mountSuspended(CommandExample, {
      props: { command: 'megaport-cli ports list', description: 'List all your ports' },
    })
    expect(wrapper.text()).toContain('List all your ports')
  })

  it('hides description when not provided', async () => {
    const wrapper = await mountSuspended(CommandExample, {
      props: { command: 'megaport-cli ports list' },
    })
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('shows output block when provided', async () => {
    const wrapper = await mountSuspended(CommandExample, {
      props: { command: 'megaport-cli version', output: 'v1.0.0' },
    })
    expect(wrapper.text()).toContain('v1.0.0')
  })

  it('calls clipboard.writeText with the command on copy click', async () => {
    const wrapper = await mountSuspended(CommandExample, {
      props: { command: 'megaport-cli ports list' },
    })
    await wrapper.find('button').trigger('click')
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('megaport-cli ports list')
  })
})
