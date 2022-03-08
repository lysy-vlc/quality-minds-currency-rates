import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CurrencySelector from '../CurrencySelector.vue'

const currencies = [
  {
    'currency': 'bat (Tajlandia)',
    'code': 'THB',
    'mid': 0.136
  },
  {
    'currency': 'dolar amerykański',
    'code': 'USD',
    'mid': 4.5115
  }
]

describe('CurrencySelector', () => {
  it('renders properly', async () => {
    const wrapper = mount(CurrencySelector, {
      props: {
        currencies
      }
    })

    await wrapper.find('select').setValue(currencies[0].code)

    expect(wrapper.find('select').text()).toContain('THB')
  })

  it('emits select event properly', async () => {
    const wrapper = mount(CurrencySelector, {
      props: {
        currencies
      }
    })

    await wrapper.find('select').setValue(currencies[0].code)

    expect(wrapper.emitted().change).toEqual([ [ currencies[0].code ] ])
  })
})
