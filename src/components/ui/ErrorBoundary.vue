<template>
  <div v-if="error" class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-4">
        <ExclamationTriangleIcon class="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
        Something went wrong
      </h3>
      
      <p class="text-gray-600 dark:text-gray-400 text-center mb-6">
        {{ error.message || 'An unexpected error occurred. Please try again.' }}
      </p>
      
      <div class="space-y-3">
        <button
          @click="retry"
          class="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
        
        <button
          @click="goHome"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Go to Homepage
        </button>
      </div>
      
      <!-- Development error details -->
      <details v-if="isDevelopment && error.stack" class="mt-4">
        <summary class="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
          Show error details
        </summary>
        <pre class="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-auto max-h-40">{{ error.stack }}</pre>
      </details>
    </div>
  </div>
  
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const error = ref(null)
const isDevelopment = import.meta.env.DEV

// Props
const props = defineProps({
  fallback: {
    type: Function,
    default: null
  }
})

// Emits
const emit = defineEmits(['error'])

// Error handling
onErrorCaptured((err, instance, info) => {
  console.error('ErrorBoundary caught error:', err, info)
  error.value = err
  emit('error', { error: err, instance, info })
  
  // Call custom fallback if provided
  if (props.fallback) {
    props.fallback(err, instance, info)
  }
  
  return false // Prevent error from propagating
})

// Methods
const retry = () => {
  error.value = null
  // Optionally trigger a component re-render or route refresh
}

const goHome = () => {
  error.value = null
  router.push('/')
}

// Handle unhandled promise rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    error.value = event.reason
    event.preventDefault()
  })
}
</script>
