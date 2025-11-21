<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Connectivity Test
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Diagnosing connection issues with Appwrite
        </p>
        <router-link to="/" class="text-primary hover:text-primary-dark text-sm">
          ← Back to Home
        </router-link>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <!-- Configuration Display -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Current Configuration</h3>
          <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm font-mono">
            <div><strong>Endpoint:</strong> {{ config.endpoint }}</div>
            <div><strong>Project ID:</strong> {{ config.projectId }}</div>
            <div><strong>Database ID:</strong> {{ config.databaseId }}</div>
          </div>
        </div>

        <!-- Basic Tests -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Basic Tests</h3>
          <div class="space-y-3">
            <button
              @click="testInternetConnection"
              :disabled="loading"
              class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {{ loading ? 'Testing...' : 'Test Internet Connection' }}
            </button>

            <button
              @click="testAppwriteEndpoint"
              :disabled="loading"
              class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {{ loading ? 'Testing...' : 'Test Appwrite Endpoint' }}
            </button>

            <button
              @click="testProjectAccess"
              :disabled="loading"
              class="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {{ loading ? 'Testing...' : 'Test Project Access' }}
            </button>
          </div>
        </div>

        <!-- Results -->
        <div v-if="results.length > 0">
          <h3 class="text-lg font-semibold mb-4">Test Results</h3>
          <div class="space-y-2 max-h-60 overflow-y-auto">
            <div
              v-for="(result, index) in results"
              :key="index"
              :class="[
                'p-3 rounded-lg text-sm',
                result.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                result.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                result.type === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              ]"
            >
              <div class="flex items-start justify-between">
                <span>{{ result.message }}</span>
                <span class="text-xs opacity-75">{{ formatTime(result.timestamp) }}</span>
              </div>
              <div v-if="result.details" class="mt-2 text-xs opacity-80">
                {{ result.details }}
              </div>
            </div>
          </div>
          <button
            @click="clearResults"
            class="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear Results
          </button>
        </div>

        <!-- Quick Fix Suggestions -->
        <div v-if="suggestions.length > 0">
          <h3 class="text-lg font-semibold mb-4">Suggested Fixes</h3>
          <div class="space-y-2">
            <div
              v-for="(suggestion, index) in suggestions"
              :key="index"
              class="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4"
            >
              <div class="font-medium text-yellow-800 dark:text-yellow-200">{{ suggestion.title }}</div>
              <div class="text-sm text-yellow-700 dark:text-yellow-300 mt-1">{{ suggestion.description }}</div>
              <div v-if="suggestion.steps" class="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                <div v-for="(step, stepIndex) in suggestion.steps" :key="stepIndex">
                  {{ stepIndex + 1 }}. {{ step }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const results = ref([])
const suggestions = ref([])

const config = ref({
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID
})

const addResult = (message, type = 'info', details = null) => {
  results.value.unshift({
    message,
    type,
    details,
    timestamp: new Date()
  })
}

const addSuggestion = (title, description, steps = null) => {
  suggestions.value.push({
    title,
    description,
    steps
  })
}

const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString()
}

const clearResults = () => {
  results.value = []
  suggestions.value = []
}

const testInternetConnection = async () => {
  loading.value = true
  addResult('Testing internet connection...', 'info')

  try {
    // Test connection to a reliable service
    const response = await fetch('https://httpbin.org/get', {
      method: 'GET',
      mode: 'cors'
    })

    if (response.ok) {
      addResult('✅ Internet connection is working', 'success')
    } else {
      addResult('⚠️ Internet connection has issues', 'warning', `Status: ${response.status}`)
    }
  } catch (error) {
    addResult('❌ Internet connection failed', 'error', error.message)
    addSuggestion(
      'Internet Connection Issue',
      'Your device cannot reach external services. Check your internet connection.',
      [
        'Check if you are connected to the internet',
        'Try accessing other websites',
        'Check your firewall or antivirus settings',
        'Try using a different network'
      ]
    )
  } finally {
    loading.value = false
  }
}

const testAppwriteEndpoint = async () => {
  loading.value = true
  addResult('Testing Appwrite endpoint accessibility...', 'info')

  try {
    const endpoint = config.value.endpoint
    addResult(`Testing: ${endpoint}`, 'info')

    // Test if we can reach the Appwrite endpoint
    const response = await fetch(`${endpoint}/health`, {
      method: 'GET',
      mode: 'cors'
    })

    if (response.ok) {
      const data = await response.json()
      addResult('✅ Appwrite endpoint is accessible', 'success', `Status: ${data.status || 'OK'}`)
    } else {
      addResult('⚠️ Appwrite endpoint responded with error', 'warning', `Status: ${response.status}`)
    }
  } catch (error) {
    addResult('❌ Cannot reach Appwrite endpoint', 'error', error.message)
    
    if (error.message.includes('CORS')) {
      addSuggestion(
        'CORS Configuration Issue',
        'The Appwrite project is not configured to allow requests from your domain.',
        [
          'Go to https://cloud.appwrite.io/console',
          'Select your project',
          'Go to Settings > Platforms',
          'Add a new Web platform',
          'Set the hostname to: localhost:5173',
          'Save the changes'
        ]
      )
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      addSuggestion(
        'Network Connection Issue',
        'Cannot establish connection to Appwrite servers.',
        [
          'Check if cloud.appwrite.io is accessible in your browser',
          'Try using a VPN if your region blocks the service',
          'Check your firewall settings',
          'Verify the endpoint URL in your .env file'
        ]
      )
    }
  } finally {
    loading.value = false
  }
}

const testProjectAccess = async () => {
  loading.value = true
  addResult('Testing project access...', 'info')

  try {
    const endpoint = config.value.endpoint
    const projectId = config.value.projectId
    
    addResult(`Testing project: ${projectId}`, 'info')

    // Try to access the project's account endpoint
    const response = await fetch(`${endpoint}/account`, {
      method: 'GET',
      headers: {
        'X-Appwrite-Project': projectId,
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })

    if (response.status === 401) {
      addResult('✅ Project access is working (401 is expected without auth)', 'success', 'The project exists and is accessible')
    } else if (response.status === 404) {
      addResult('❌ Project not found', 'error', 'The project ID might be incorrect')
      addSuggestion(
        'Invalid Project ID',
        'The project ID in your configuration does not exist.',
        [
          'Go to https://cloud.appwrite.io/console',
          'Check your project list',
          'Copy the correct Project ID',
          'Update your .env file with the correct VITE_APPWRITE_PROJECT_ID',
          'Restart your development server'
        ]
      )
    } else {
      addResult(`⚠️ Unexpected response: ${response.status}`, 'warning')
    }
  } catch (error) {
    addResult('❌ Project access test failed', 'error', error.message)
  } finally {
    loading.value = false
  }
}
</script>
