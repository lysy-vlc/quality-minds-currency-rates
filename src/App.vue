<script setup>
// components
import CurrencySelector from '@/components/CurrencySelector.vue'
import Input from '@/components/Input.vue'
import Loader from '@/components/Loader.vue'

import { onMounted, ref } from 'vue'

// constants
const TABLE = 'A'

// refs
const currencyTable = ref([])
const selectedCurrency = ref(null)
const inputValues = ref({
  first: null,
  second: null
})
const loading = ref(false)

// methods
const getCurrencyTable = async () => {
  try {
    const response = await fetch(`https://api.nbp.pl/api/exchangerates/tables/${TABLE}`)

    const data = await response.json()

    currencyTable.value = data[0]
  } catch (e) {
    console.error(e)
  }
}

const getCurrentCurrencyRate = async (code, table) => {
  try {
    loading.value = true

    const result = await fetch(`https://api.nbp.pl/api/exchangerates/rates/${table}/${code}/`)

    const data = await result.json()

    return data?.rates[0]?.mid
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleSelectedCurrencyChange = (value) => {
  inputValues.value = {
    first: null,
    second: null
  }

  selectedCurrency.value = value
}

const debounce = (func, timeout = 400) => {
  let timer

  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

const handleInputChange = async (value, name) => {
  if (value) {
    const rate = await getCurrentCurrencyRate(selectedCurrency.value, TABLE)

    if (name == 'first') {
      inputValues.value = {
        first: value,
        second: value / rate
      }

      return
    }

    inputValues.value = {
      first: value * rate,
      second: value
    }

    return
  }

  inputValues.value = {
    first: null,
    second: null
  }
}

const debounceInputChange = debounce((value, name) => handleInputChange(value, name))

// lifecycle methods
onMounted(() => {
  getCurrencyTable()
})
</script>

<template>
  <main>
    <CurrencySelector
        @change="handleSelectedCurrencyChange"
        :currencies="currencyTable.rates"
    />

    <div class="inputs-container" v-if="selectedCurrency">
      <Input
          @change="debounceInputChange"
          name="first"
          currency="PLN"
          :values="inputValues"
          :disabled="loading"
      />

      <Loader v-if="loading"/>

      <Input
          @change="debounceInputChange"
          name="second"
          :currency="selectedCurrency"
          :values="inputValues"
          :disabled="loading"
      />
    </div>
  </main>
</template>

<style scoped>
.inputs-container {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
