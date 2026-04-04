import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CodeBlock from '~/components/ui/CodeBlock.vue'

describe('CodeBlock clipboard fallback', () => {
  beforeEach(() => {
    // Mock clipboard API that fails
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('Not allowed')) },
      writable: true,
      configurable: true,
    })
    // Define execCommand on happy-dom's document (not defined by default)
    if (!document.execCommand) {
      document.execCommand = vi.fn().mockReturnValue(true)
    } else {
      vi.spyOn(document, 'execCommand').mockReturnValue(true)
    }
  })

  it('falls back to execCommand when clipboard API fails', async () => {
    const wrapper = await mountSuspended(CodeBlock, {
      props: { code: 'megaport-cli ports list', language: 'bash' },
    })

    const buttons = wrapper.findAll('button')
    const copyBtn = buttons[buttons.length - 1]
    await copyBtn.trigger('click')

    // Wait for async clipboard attempt + fallback
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(document.execCommand).toHaveBeenCalledWith('copy')
  })

  it('shows Copied state even when using fallback', async () => {
    const wrapper = await mountSuspended(CodeBlock, {
      props: { code: 'megaport-cli version', language: 'bash' },
    })

    const buttons = wrapper.findAll('button')
    const copyBtn = buttons[buttons.length - 1]
    await copyBtn.trigger('click')

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(wrapper.text()).toContain('Copied!')
  })
})
