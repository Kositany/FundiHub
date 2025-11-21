<template>
  <div class="flex items-center justify-center">
    <div class="animate-spin rounded-full border-2 border-gray-300 border-t-primary" :class="sizeClass"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }
  return sizes[props.size]
})
</script>
