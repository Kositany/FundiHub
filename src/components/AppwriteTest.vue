<template>
  <div class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
      Appwrite Connection Test
    </h3>
    
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <div :class="[
          'w-3 h-3 rounded-full',
          connectionStatus === 'connected' ? 'bg-green-500' :
          connectionStatus === 'connecting' ? 'bg-yellow-500' :
          'bg-red-500'
        ]"></div>
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {{ connectionStatus === 'connected' ? 'Connected to Appwrite' :
             connectionStatus === 'connecting' ? 'Connecting...' :
             'Connection failed' }}
        </span>
      </div>
      
      <button
        @click="sendPing"
        :disabled="loading"
        class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
      >
        {{ loading ? 'Sending...' : 'Send a ping' }}
      </button>
      
      <div v-if="pingResult" class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
        <pre class="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{{ pingResult }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { account } from '@/services/appwrite'

const connectionStatus = ref('connecting')
const loading = ref(false)
const pingResult = ref('')

const testConnection = async () => {
  try {
    // Try to get account info (this will work even without login)
    await account.get()
    connectionStatus.value = 'connected'
  } catch (error) {
    // If error is 401 (unauthorized), connection is working
    if (error.code === 401) {
      connectionStatus.value = 'connected'
    } else {
      connectionStatus.value = 'error'
      console.error('Appwrite connection error:', error)
    }
  }
}

const sendPing = async () => {
  loading.value = true
  pingResult.value = ''
  
  try {
    // Test basic Appwrite functionality
    const response = await account.get()
    pingResult.value = `Success! Connected to Appwrite.\nProject: ${response.name || 'Fundi Hub'}\nEmail: ${response.email || 'Not logged in'}`
  } catch (error) {
    if (error.code === 401) {
      pingResult.value = `Success! Appwrite is working correctly.\nStatus: Ready for authentication\nEndpoint: Connected`
    } else {
      pingResult.value = `Error: ${error.message}\nCode: ${error.code || 'Unknown'}`
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  testConnection()
})
</script>
