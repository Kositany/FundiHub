<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Simple Connection Test</h3>
    
    <div class="space-y-2 mb-4">
      <div><strong>Project ID:</strong> {{ projectId }}</div>
      <div><strong>Endpoint:</strong> {{ endpoint }}</div>
      <div><strong>Database ID:</strong> {{ databaseId }}</div>
    </div>

    <button 
      @click="testBasicConnection" 
      :disabled="loading"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {{ loading ? 'Testing...' : 'Test Basic Connection' }}
    </button>

    <div v-if="results.length > 0" class="mt-4 space-y-2">
      <h4 class="font-semibold">Results:</h4>
      <div
        v-for="(result, index) in results"
        :key="index"
        :class="[
          'p-2 rounded text-sm',
          result.type === 'success' ? 'bg-green-100 text-green-800' :
          result.type === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        ]"
      >
        {{ result.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { account } from '@/services/appwrite'

const loading = ref(false)
const results = ref([])

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID

const addResult = (message, type = 'info') => {
  results.value.push({ message, type })
}

const testBasicConnection = async () => {
  loading.value = true
  results.value = []

  try {
    addResult('Testing basic Appwrite connection...', 'info')
    addResult(`Using endpoint: ${endpoint}`, 'info')
    addResult(`Using project ID: ${projectId}`, 'info')

    // Test basic connection with a simple account get
    const response = await account.get()
    addResult('✅ Connection successful - User session found!', 'success')
    addResult(`Logged in as: ${response.name} (${response.email})`, 'success')
  } catch (error) {
    if (error.code === 401) {
      addResult('✅ Connection successful - No user session (normal)', 'success')
    } else {
      addResult(`❌ Connection failed: ${error.message}`, 'error')
      addResult(`Error code: ${error.code}`, 'error')
      addResult(`Error type: ${error.type || 'unknown'}`, 'error')
      
      // Check for common issues
      if (error.message.includes('fetch')) {
        addResult('This looks like a network/CORS issue', 'error')
        addResult('Check: 1) Internet connection 2) Appwrite project settings 3) CORS configuration', 'error')
      }
    }
  } finally {
    loading.value = false
  }
}
</script>
