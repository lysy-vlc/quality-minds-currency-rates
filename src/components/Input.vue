<template>
  <div class="input">
    <label :for="`input-${name}`">{{ currency }}</label>
    <input
        type="number"
        :name="name"
        :id="`input-${name}`"
        @input="handleChange"
        :disabled="disabled"
        :value="value"
    >
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },

  currency: {
    type: String,
    default: () => 'Currency not selected'
  },

  values: {
    type: Object
  },

  disabled: {
    type: Boolean,
    default: () => false
  }
})

const value = computed(() => {
  return props.values[props.name]
})

const emit = defineEmits([ 'change' ])

const handleChange = (event) => {
  emit('change', parseInt(event.target.value), props.name)
}
</script>

<style scoped lang="scss">
.input {
  max-width: 300px;
  display: flex;
  flex-direction: column;

  input {
    padding: 10px;
  }
}
</style>