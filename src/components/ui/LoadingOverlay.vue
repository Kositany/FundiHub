<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8 flex flex-col items-center space-y-4">
      <LoadingSpinner size="lg" />
      <p class="text-gray-600 dark:text-gray-400">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import LoadingSpinner from './LoadingSpinner.vue'

defineProps({
  message: {
    type: String,
    default: 'Loading...'
  }
})
</script>
