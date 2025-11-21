<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-bold mb-4">Appwrite Connection Test</h2>
      
      <div class="space-y-4">
        <div>
          <strong>Status:</strong> {{ status }}
        </div>
        
        <div v-if="error" class="text-red-600">
          <strong>Error:</strong> {{ error }}
        </div>
        
        <div v-if="result" class="text-green-600">
          <strong>Result:</strong> {{ result }}
        </div>
        
        <button 
          @click="testConnection" 
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          :disabled="loading"
        >
          {{ loading ? 'Testing...' : 'Test Connection' }}
        </button>
        
        <button 
          @click="clearSession" 
          class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Clear Session
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { account } from '@/services/appwrite'

const status = ref('Ready')
const error = ref('')
const result = ref('')
const loading = ref(false)

const testConnection = async () => {
  loading.value = true
  error.value = ''
  result.value = ''
  status.value = 'Testing...'
  
  try {
    const session = await account.get()
    status.value = 'Connected'
    result.value = `Logged in as: ${session.email}`
  } catch (err) {
    if (err.code === 401) {
      status.value = 'No active session'
      result.value = 'Not logged in (this is normal)'
    } else {
      status.value = 'Connection failed'
      error.value = err.message
    }
  } finally {
    loading.value = false
  }
}

const clearSession = async () => {
  try {
    await account.deleteSession('current')
    status.value = 'Session cleared'
    result.value = 'Successfully logged out'
  } catch (err) {
    error.value = `Failed to clear session: ${err.message}`
  }
}

// Test on mount
testConnection()
</script>
