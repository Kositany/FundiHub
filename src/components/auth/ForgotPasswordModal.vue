<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Reset Password
      </h3>
      
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="reset-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            id="reset-email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email address"
          />
        </div>
        
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark disabled:opacity-50"
          >
            {{ loading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['close', 'submit'])

const email = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  if (!email.value) return
  
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    $emit('submit', email.value)
  } finally {
    loading.value = false
  }
}
</script>
