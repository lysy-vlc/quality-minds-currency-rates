import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Input from '../Input.vue'

const props = {
  currency: 'PLN',
  name: 'first',
  values: {
    first: 2,
    second: 4
  }
}

describe('Input', () => {
  it('renders properly', async () => {
    const wrapper = mount(Input, {
      props
    })

    expect(wrapper.text()).toContain('PLN')
  })

  it('emits input event properly', async () => {
    const wrapper = mount(Input, {
      props
    })

    await wrapper.find('input').setValue(1)

    expect(wrapper.emitted().change).toEqual([ [ 1, 'first' ] ])
  })
})
