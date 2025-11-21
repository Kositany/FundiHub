<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Connection Test</h1>
        <p class="text-gray-600 dark:text-gray-400">Testing Appwrite connection and services</p>
      </div>

      <div class="space-y-4">
        <!-- Connection Status -->
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-900 dark:text-white">Connection Status</span>
            <div class="flex items-center space-x-2">
              <div v-if="connectionStatus === 'testing'" class="flex items-center space-x-2">
                <div class="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                <span class="text-sm text-gray-600 dark:text-gray-400">Testing...</span>
              </div>
              <div v-else-if="connectionStatus === 'success'" class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                <span class="text-sm text-green-600">Connected</span>
              </div>
              <div v-else-if="connectionStatus === 'error'" class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                <span class="text-sm text-red-600">Failed</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Environment Variables -->
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 class="font-medium text-gray-900 dark:text-white mb-3">Environment Configuration</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Endpoint:</span>
              <span class="text-gray-900 dark:text-white font-mono text-xs">{{ endpoint }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Project ID:</span>
              <span class="text-gray-900 dark:text-white font-mono text-xs">{{ projectId }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Database ID:</span>
              <span class="text-gray-900 dark:text-white font-mono text-xs">{{ databaseId }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Raw Endpoint:</span>
              <span class="text-gray-900 dark:text-white font-mono text-xs">{{ rawEndpoint }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Raw Project ID:</span>
              <span class="text-gray-900 dark:text-white font-mono text-xs">{{ rawProjectId }}</span>
            </div>
          </div>
        </div>

        <!-- Test Results -->
        <div v-if="testResults.length > 0" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 class="font-medium text-gray-900 dark:text-white mb-3">Test Results</h3>
          <div class="space-y-2">
            <div v-for="result in testResults" :key="result.test" class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">{{ result.test }}</span>
              <div class="flex items-center space-x-2">
                <div v-if="result.status === 'success'" class="w-3 h-3 bg-green-500 rounded-full"></div>
                <div v-else-if="result.status === 'error'" class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div v-else class="w-3 h-3 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                <span :class="result.status === 'success' ? 'text-green-600' : result.status === 'error' ? 'text-red-600' : 'text-gray-600'">
                  {{ result.message }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Details -->
        <div v-if="errorDetails" class="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
          <h3 class="font-medium text-red-900 dark:text-red-200 mb-2">Error Details</h3>
          <div class="text-sm text-red-700 dark:text-red-300 space-y-1">
            <div><strong>Code:</strong> {{ errorDetails.code }}</div>
            <div><strong>Type:</strong> {{ errorDetails.type }}</div>
            <div><strong>Message:</strong> {{ errorDetails.message }}</div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            @click="runConnectionTest"
            :disabled="connectionStatus === 'testing'"
            class="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ connectionStatus === 'testing' ? 'Testing...' : 'Run Connection Test' }}
          </button>
          
          <button
            @click="testRegistration"
            :disabled="testingRegistration"
            class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ testingRegistration ? 'Testing Registration...' : 'Test Registration Flow' }}
          </button>

          <router-link
            to="/"
            class="block w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-center transition-colors"
          >
            Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { account, databases, DATABASE_ID, COLLECTIONS, testConnection } from '@/services/appwrite'
import { useToast } from 'vue-toastification'

const toast = useToast()

// State
const connectionStatus = ref('idle')
const testResults = ref([])
const errorDetails = ref(null)
const testingRegistration = ref(false)

// Environment info
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'Not set'
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'Not set'
const databaseId = DATABASE_ID || 'Not set'
const rawEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const rawProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID

const runConnectionTest = async () => {
  connectionStatus.value = 'testing'
  testResults.value = []
  errorDetails.value = null

  const tests = [
    {
      name: 'Ping Test',
      test: async () => {
        try {
          const result = await testConnection()
          return { success: true, message: `Response time: ${result.time}ms` }
        } catch (error) {
          throw error
        }
      }
    },
    {
      name: 'Health Check',
      test: async () => {
        try {
          await account.get()
          return { success: true, message: 'Service available' }
        } catch (error) {
          if (error.code === 401) {
            return { success: true, message: 'Service available (no session)' }
          }
          throw error
        }
      }
    },
    {
      name: 'Database Connection',
      test: async () => {
        try {
          await databases.list()
          return { success: true, message: 'Database accessible' }
        } catch (error) {
          throw error
        }
      }
    },
    {
      name: 'Database Exists',
      test: async () => {
        try {
          await databases.get(DATABASE_ID)
          return { success: true, message: 'Database found' }
        } catch (error) {
          throw error
        }
      }
    },
    {
      name: 'Users Collection',
      test: async () => {
        try {
          await databases.getCollection(DATABASE_ID, COLLECTIONS.USERS)
          return { success: true, message: 'Collection exists' }
        } catch (error) {
          throw error
        }
      }
    }
  ]

  for (const testCase of tests) {
    try {
      const result = await testCase.test()
      testResults.value.push({
        test: testCase.name,
        status: 'success',
        message: result.message
      })
    } catch (error) {
      console.error(`Test failed: ${testCase.name}`, error)
      testResults.value.push({
        test: testCase.name,
        status: 'error',
        message: error.message || 'Test failed'
      })
      
      if (!errorDetails.value) {
        errorDetails.value = {
          code: error.code || 'Unknown',
          type: error.type || 'Unknown',
          message: error.message || 'Unknown error'
        }
      }
    }
  }

  connectionStatus.value = testResults.value.every(r => r.status === 'success') ? 'success' : 'error'
}

const testRegistration = async () => {
  testingRegistration.value = true
  
  try {
    // Test with a dummy email
    const testEmail = `test_${Date.now()}@example.com`
    const testPassword = 'testPassword123!'
    const testName = 'Test User'
    
    console.log('Testing registration with:', testEmail)
    
    // This will likely fail, but we want to see what specific error we get
    await account.create('ID.unique()', testEmail, testPassword, testName)
    
    toast.success('Registration test successful!')
  } catch (error) {
    console.error('Registration test error:', error)
    
    if (error.message.includes('fetch') || error.message.includes('load')) {
      toast.error('Connection failed - check your internet connection')
    } else if (error.code === 409) {
      toast.info('Registration endpoint is working (email already exists error is expected)')
    } else {
      toast.error(`Registration test failed: ${error.message}`)
    }
    
    errorDetails.value = {
      code: error.code || 'Unknown',
      type: error.type || 'Network/Connection',
      message: error.message || 'Unknown error'
    }
  } finally {
    testingRegistration.value = false
  }
}

onMounted(() => {
  // Automatically run connection test when component mounts
  runConnectionTest()
})
</script>
