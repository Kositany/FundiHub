<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Simple Connection Test -->
    <SimpleConnectionTest />
    
    <!-- Full Test Component -->
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Appwrite Connection Test</h2>
    
    <!-- Connection Status -->
    <div class="mb-6">
      <div class="flex items-center space-x-3 mb-4">
        <div :class="[
          'w-3 h-3 rounded-full',
          connectionStatus === 'connected' ? 'bg-green-500' :
          connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
          'bg-red-500'
        ]"></div>
        <span class="font-semibold">
          {{ connectionStatus === 'connected' ? 'Connected' :
             connectionStatus === 'connecting' ? 'Connecting...' :
             'Disconnected' }}
        </span>
      </div>
      
      <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm">
        <p><strong>Endpoint:</strong> {{ config.endpoint }}</p>
        <p><strong>Project ID:</strong> {{ config.projectId }}</p>
        <p><strong>Database ID:</strong> {{ config.databaseId }}</p>
      </div>
    </div>

    <!-- Test Buttons -->
    <div class="space-y-4 mb-6">
      <button
        @click="testConnection"
        :disabled="loading"
        class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
      >
        {{ loading ? 'Testing...' : 'Test Connection' }}
      </button>
      
      <button
        @click="clearSession"
        :disabled="loading"
        class="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
      >
        {{ loading ? 'Clearing...' : 'Clear Active Session' }}
      </button>
      
      <button
        @click="testDatabase"
        :disabled="loading"
        class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
      >
        {{ loading ? 'Testing...' : 'Test Database' }}
      </button>
      
      <button
        @click="setupDatabase"
        :disabled="loading"
        class="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
      >
        {{ loading ? 'Setting up...' : 'Setup Database & Collections' }}
      </button>
    </div>

    <!-- Test Results -->
    <div v-if="testResults.length > 0" class="space-y-2">
      <h3 class="font-semibold text-gray-900 dark:text-white">Test Results:</h3>
      <div class="max-h-60 overflow-y-auto space-y-2">
        <div
          v-for="(result, index) in testResults"
          :key="index"
          :class="[
            'p-3 rounded-lg text-sm',
            result.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            result.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          ]"
        >
          <div class="flex items-start justify-between">
            <span>{{ result.message }}</span>
            <span class="text-xs opacity-75">{{ formatTime(result.timestamp) }}</span>
          </div>
        </div>
      </div>
      <button
        @click="clearResults"
        class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        Clear Results
      </button>
    </div>

    <!-- Quick Auth Test -->
    <div class="mt-8 border-t pt-6">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Quick Authentication Test</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Test Email</label>
          <input
            v-model="testUser.email"
            type="email"
            placeholder="test@example.com"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Test Password</label>
          <input
            v-model="testUser.password"
            type="password"
            placeholder="password123"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      
      <div class="flex space-x-4 mt-4">
        <button
          @click="testSignup"
          :disabled="loading || !testUser.email || !testUser.password"
          class="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Test Signup
        </button>
        <button
          @click="testLogin"
          :disabled="loading || !testUser.email || !testUser.password"
          class="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Test Login
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { account, databases, DATABASE_ID, COLLECTIONS } from '@/services/appwrite'
import { setupAppwriteDatabase, testAppwriteConnection } from '@/utils/appwrite-setup'
import { ID } from 'appwrite'
import SimpleConnectionTest from './SimpleConnectionTest.vue'

// State
const loading = ref(false)
const connectionStatus = ref('disconnected')
const testResults = ref([])

const config = ref({
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID
})

const testUser = ref({
  email: 'test@example.com',
  password: 'password123'
})

// Methods
const addResult = (message, type = 'info') => {
  testResults.value.unshift({
    message,
    type,
    timestamp: new Date()
  })
}

const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString()
}

const clearResults = () => {
  testResults.value = []
}

const testConnection = async () => {
  loading.value = true
  connectionStatus.value = 'connecting'
  
  try {
    addResult('Testing Appwrite connection...', 'info')
    
    // Test basic connection
    const health = await account.get()
    
    connectionStatus.value = 'connected'
    addResult('✅ Connection successful! User session available.', 'success')
    addResult(`Connected as: ${health.email || health.name || 'Anonymous'}`, 'success')
  } catch (error) {
    connectionStatus.value = 'disconnected'
    
    if (error.code === 401) {
      addResult('✅ Connection successful but no user session (this is normal)', 'success')
      connectionStatus.value = 'connected'
    } else {
      addResult(`❌ Connection failed: ${error.message}`, 'error')
      console.error('Connection test failed:', error)
    }
  } finally {
    loading.value = false
  }
}

const clearSession = async () => {
  loading.value = true
  
  try {
    addResult('Checking for active sessions...', 'info')
    
    // Try to get current user (this will fail if no session)
    try {
      const user = await account.get()
      addResult(`Found active session for: ${user.email}`, 'info')
      
      // Delete current session
      await account.deleteSession('current')
      addResult('✅ Active session cleared successfully!', 'success')
      connectionStatus.value = 'disconnected'
    } catch (error) {
      if (error.code === 401) {
        addResult('ℹ️ No active session found', 'info')
      } else {
        throw error
      }
    }
  } catch (error) {
    addResult(`❌ Failed to clear session: ${error.message}`, 'error')
    console.error('Clear session failed:', error)
  } finally {
    loading.value = false
  }
}

const testDatabase = async () => {
  loading.value = true
  
  try {
    addResult('Testing database connection...', 'info')
    
    const success = await testAppwriteConnection()
    
    if (success) {
      addResult('✅ Database connection successful!', 'success')
    } else {
      addResult('❌ Database connection failed', 'error')
    }
  } catch (error) {
    addResult(`❌ Database test failed: ${error.message}`, 'error')
    console.error('Database test failed:', error)
  } finally {
    loading.value = false
  }
}

const setupDatabase = async () => {
  loading.value = true
  
  try {
    addResult('Setting up database and collections...', 'info')
    
    const success = await setupAppwriteDatabase()
    
    if (success) {
      addResult('✅ Database setup completed successfully!', 'success')
    } else {
      addResult('❌ Database setup failed', 'error')
    }
  } catch (error) {
    addResult(`❌ Database setup failed: ${error.message}`, 'error')
    console.error('Database setup failed:', error)
  } finally {
    loading.value = false
  }
}

const testSignup = async () => {
  loading.value = true
  
  try {
    addResult(`Testing signup with ${testUser.value.email}...`, 'info')
    
    // Create account
    const user = await account.create(
      ID.unique(),
      testUser.value.email,
      testUser.value.password,
      'Test User'
    )
    
    addResult('✅ Account created successfully!', 'success')
    addResult(`User ID: ${user.$id}`, 'success')
    
    // Try to create session
    await account.createEmailPasswordSession(testUser.value.email, testUser.value.password)
    addResult('✅ Login session created!', 'success')
    
    // Logout to clean up
    await account.deleteSession('current')
    addResult('🔄 Test session cleaned up', 'info')
    
  } catch (error) {
    if (error.code === 409) {
      addResult('ℹ️ User already exists, trying login instead...', 'info')
      await testLogin()
    } else {
      addResult(`❌ Signup failed: ${error.message}`, 'error')
      console.error('Signup test failed:', error)
    }
  } finally {
    loading.value = false
  }
}

const testLogin = async () => {
  loading.value = true
  
  try {
    addResult(`Testing login with ${testUser.value.email}...`, 'info')
    
    // Check if there's already an active session
    try {
      const existingUser = await account.get()
      addResult(`ℹ️ Active session found for: ${existingUser.email}`, 'info')
      
      // Delete existing session first
      await account.deleteSession('current')
      addResult('🔄 Cleared existing session', 'info')
    } catch (error) {
      // No active session, which is fine
      addResult('ℹ️ No active session found', 'info')
    }
    
    // Now try to create new session
    await account.createEmailPasswordSession(testUser.value.email, testUser.value.password)
    addResult('✅ Login successful!', 'success')
    
    const user = await account.get()
    addResult(`Logged in as: ${user.name} (${user.email})`, 'success')
    
    // Logout to clean up
    await account.deleteSession('current')
    addResult('🔄 Test session cleaned up', 'info')
    
  } catch (error) {
    addResult(`❌ Login failed: ${error.message}`, 'error')
    console.error('Login test failed:', error)
  } finally {
    loading.value = false
  }
}

// Initialize
onMounted(() => {
  addResult('Appwrite Test Component loaded', 'info')
  testConnection()
})
</script>
