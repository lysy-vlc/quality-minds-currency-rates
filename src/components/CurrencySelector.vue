<template>
  <div class="currency-selector">
    <select name="currency-selector" @change="handleChange">
      <option value="">Select currency</option>
      <option
          v-for="currency in props.currencies"
          :key="currency.code"
          :value="currency.code"
      >{{ currency.currency }} ({{ currency.code }})</option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  currencies: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['change'])

const handleChange = (event) => {
  emit('change', event.target.value)
}
</script>

<style scoped lang="scss">
.currency-selector {

  margin-bottom: 20px;

  select {
    padding: 10px;
  }
}
</style>