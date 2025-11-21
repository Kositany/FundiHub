<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Connection & Authentication Test</h1>
        
        <!-- Connection Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Appwrite Connection Status</h2>
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="font-medium w-24">Endpoint:</span>
              <span class="text-gray-600 dark:text-gray-400">{{ appwriteConfig.endpoint }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-medium w-24">Project:</span>
              <span class="text-gray-600 dark:text-gray-400">{{ appwriteConfig.projectId }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-medium w-24">Status:</span>
              <span :class="connectionStatus.connected ? 'text-green-600' : 'text-red-600'" class="font-medium">
                {{ connectionStatus.connected ? '✅ Connected' : '❌ Disconnected' }}
              </span>
            </div>
            <div v-if="connectionStatus.error" class="text-red-600 text-sm">
              Error: {{ connectionStatus.error }}
            </div>
          </div>
          <button 
            @click="testConnection" 
            :disabled="testing"
            class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ testing ? 'Testing...' : 'Test Connection' }}
          </button>
        </div>

        <!-- Test User Accounts -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Test User Accounts</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="testUser in testUsers" :key="testUser.email" class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 class="font-medium text-lg mb-2">{{ testUser.type }} Account</h3>
              <div class="space-y-2 text-sm">
                <div><strong>Email:</strong> {{ testUser.email }}</div>
                <div><strong>Password:</strong> {{ testUser.password }}</div>
                <div><strong>Name:</strong> {{ testUser.name }}</div>
              </div>
              <button 
                @click="testLogin(testUser)"
                :disabled="loggingIn"
                class="mt-3 w-full bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 disabled:opacity-50 text-sm"
              >
                {{ loggingIn ? 'Logging in...' : 'Test Login' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Create Test Accounts -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Create Test Accounts</h2>
          <button 
            @click="createTestAccounts"
            :disabled="creating"
            class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {{ creating ? 'Creating...' : 'Create All Test Accounts' }}
          </button>
          <div v-if="creationResults.length > 0" class="mt-4 space-y-2">
            <div v-for="result in creationResults" :key="result.email" class="text-sm">
              <span :class="result.success ? 'text-green-600' : 'text-red-600'">
                {{ result.success ? '✅' : '❌' }} {{ result.email }}: {{ result.message }}
              </span>
            </div>
          </div>
        </div>

        <!-- Current Session -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 class="text-xl font-semibold mb-4">Current Session</h2>
          <div v-if="currentUser">
            <div class="space-y-2 text-sm">
              <div><strong>User ID:</strong> {{ currentUser.$id }}</div>
              <div><strong>Email:</strong> {{ currentUser.email }}</div>
              <div><strong>Name:</strong> {{ currentUser.name }}</div>
            </div>
            <button 
              @click="logout"
              class="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
          <div v-else class="text-gray-500 dark:text-gray-400">
            No active session
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { account, getEndpoint, getProjectId } from '@/services/appwrite'
import { useAuthStore } from '@/stores/auth'
import { useNotifications } from '@/composables/useNotifications'

const authStore = useAuthStore()
const { showSuccess, showError } = useNotifications()

// Reactive state
const testing = ref(false)
const loggingIn = ref(false)
const creating = ref(false)
const connectionStatus = ref({ connected: false, error: null })
const currentUser = ref(null)
const creationResults = ref([])

// App config
const appwriteConfig = ref({
  endpoint: getEndpoint(),
  projectId: getProjectId()
})

// Test user accounts
const testUsers = ref([
  {
    type: 'User',
    email: 'user@test.com',
    password: 'password123',
    name: 'Test User',
    userType: 'user'
  },
  {
    type: 'Fundi',
    email: 'fundi@test.com',
    password: 'password123',
    name: 'Test Fundi',
    userType: 'fundi'
  },
  {
    type: 'Business',
    email: 'business@test.com',
    password: 'password123',
    name: 'Test Business',
    userType: 'business'
  }
])

// Test connection
const testConnection = async () => {
  testing.value = true
  try {
    // Try to get current session info
    const session = await account.get()
    connectionStatus.value = { connected: true, error: null }
    currentUser.value = session
    showSuccess('Connection Test', 'Successfully connected to Appwrite!')
  } catch (error) {
    if (error.code === 401) {
      connectionStatus.value = { connected: true, error: 'Not authenticated (this is normal)' }
      showSuccess('Connection Test', 'Connected to Appwrite! (No active session)')
    } else {
      connectionStatus.value = { connected: false, error: error.message }
      showError('Connection Test', `Failed to connect: ${error.message}`)
    }
  } finally {
    testing.value = false
  }
}

// Test login
const testLogin = async (testUser) => {
  loggingIn.value = true
  try {
    // First logout any existing session
    try {
      await account.deleteSession('current')
    } catch (e) {
      // No existing session
    }

    // Try to login
    await account.createEmailPasswordSession(testUser.email, testUser.password)
    const session = await account.get()
    currentUser.value = session
    
    showSuccess('Login Test', `Successfully logged in as ${testUser.name}!`)
  } catch (error) {
    showError('Login Test', `Failed to login: ${error.message}`)
    console.error('Login error:', error)
  } finally {
    loggingIn.value = false
  }
}

// Create test accounts
const createTestAccounts = async () => {
  creating.value = true
  creationResults.value = []
  
  for (const testUser of testUsers.value) {
    try {
      await authStore.register(testUser.email, testUser.password, testUser.name, testUser.userType)
      creationResults.value.push({
        email: testUser.email,
        success: true,
        message: 'Account created successfully'
      })
    } catch (error) {
      creationResults.value.push({
        email: testUser.email,
        success: false,
        message: error.message
      })
    }
  }
  
  creating.value = false
  showSuccess('Account Creation', 'Finished creating test accounts!')
}

// Logout
const logout = async () => {
  try {
    await account.deleteSession('current')
    currentUser.value = null
    showSuccess('Logout', 'Successfully logged out!')
  } catch (error) {
    showError('Logout', `Failed to logout: ${error.message}`)
  }
}

onMounted(() => {
  testConnection()
})
</script>
