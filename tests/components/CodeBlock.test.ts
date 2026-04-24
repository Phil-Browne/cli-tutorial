import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CodeBlock from '~/components/ui/CodeBlock.vue'

describe('CodeBlock', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    })
  })

  it('renders the code content', async () => {
    const wrapper = await mountSuspended(CodeBlock, {
      props: { code: 'megaport-cli ports list', language: 'bash' },
    })
    expect(wrapper.find('code').text()).toBe('megaport-cli ports list')
  })

  it('shows the language badge', async () => {
    const wrapper = await mountSuspended(CodeBlock, {
      props: { code: 'echo hello', language: 'bash' },
    })
    expect(wrapper.text()).toContain('bash')
  })

  it('shows filename when provided', async () => {
    const wrapper = await mountSuspended(CodeBlock, {
      props: { code: 'x = 1', filename: 'config.py' },
    })
    expect(wrapper.text()).toContain('config.py')
  })

  it('renders tab buttons in tabs mode', async () => {
    const tabs = [
      { label: 'CLI', code: 'megaport-cli ports list', lang: 'bash' },
      { label: 'JSON', code: '{"ports": []}', lang: 'json' },
    ]
    const wrapper = await mountSuspended(CodeBlock, { props: { tabs } })
    const buttons = wrapper.findAll('button')
    const tabLabels = buttons.map(b => b.text()).filter(t => t === 'CLI' || t === 'JSON')
    expect(tabLabels).toContain('CLI')
    expect(tabLabels).toContain('JSON')
  })

  it('switches code content when a tab is clicked', async () => {
    const tabs = [
      { label: 'CLI', code: 'megaport-cli ports list', lang: 'bash' },
      { label: 'JSON', code: '{"ports": []}', lang: 'json' },
    ]
    const wrapper = await mountSuspended(CodeBlock, { props: { tabs } })
    // Initially shows first tab
    expect(wrapper.find('code').text()).toBe('megaport-cli ports list')
    // Click second tab
    const buttons = wrapper.findAll('button')
    const jsonTab = buttons.find(b => b.text() === 'JSON')
    await jsonTab?.trigger('click')
    expect(wrapper.find('code').text()).toBe('{"ports": []}')
  })

  it('calls clipboard.writeText with current code on copy', async () => {
    const wrapper = await mountSuspended(CodeBlock, {
      props: { code: 'megaport-cli mcr list', language: 'bash' },
    })
    // Copy button is the last button (after any tabs)
    const buttons = wrapper.findAll('button')
    const copyBtn = buttons[buttons.length - 1]
    await copyBtn.trigger('click')
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('megaport-cli mcr list')
  })
})
