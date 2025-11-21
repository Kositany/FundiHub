<template>
  <button
    @click="toggle"
    :class="[
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
      modelValue ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
    ]"
  >
    <span
      :class="[
        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
        modelValue ? 'translate-x-6' : 'translate-x-1'
      ]"
    />
  </button>
</template>

<script setup>
// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Methods
const toggle = () => {
  try {
    emit('update:modelValue', !props.modelValue)
  } catch (error) {
    console.error('Error toggling switch:', error)
  }
}
</script>
