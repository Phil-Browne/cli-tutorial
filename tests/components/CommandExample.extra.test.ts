import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CommandExample from '~/components/ui/CommandExample.vue'

describe('CommandExample additional tests', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    })
  })

  it('renders long commands without truncation', async () => {
    const longCommand = 'megaport-cli partners list --company-name "Amazon Web Services" --location-id 3 --output json --verbose'
    const wrapper = await mountSuspended(CommandExample, {
      props: { command: longCommand },
    })
    expect(wrapper.text()).toContain(longCommand)
  })

  it('renders commands with special characters', async () => {
    const command = 'megaport-cli ports list --filter "name=test&status=active"'
    const wrapper = await mountSuspended(CommandExample, {
      props: { command },
    })
    expect(wrapper.text()).toContain(command)
  })

  it('handles empty output prop gracefully', async () => {
    const wrapper = await mountSuspended(CommandExample, {
      props: { command: 'megaport-cli version', output: '' },
    })
    expect(wrapper.text()).toContain('megaport-cli version')
  })
})
