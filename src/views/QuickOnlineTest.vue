<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">🧪 Quick Online Test</h1>
          <p class="text-gray-600">Simple database connectivity and user creation test</p>
        </div>

        <!-- Connection Status -->
        <div class="mb-6 p-4 rounded-lg" :class="connectionStatus.online ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div :class="[
                'w-4 h-4 rounded-full',
                connectionStatus.online ? 'bg-green-400' : 'bg-red-400'
              ]"></div>
              <span class="font-medium" :class="connectionStatus.online ? 'text-green-800' : 'text-red-800'">
                {{ connectionStatus.online ? 'Online' : 'Offline' }}
              </span>
            </div>
            <button 
              @click="testConnection"
              :disabled="testing"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {{ testing ? '🔄 Testing...' : '🔍 Test Connection' }}
            </button>
          </div>
        </div>

        <!-- Create Test User Form -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- User Creation -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold mb-4">📝 Create Test User</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="newUser.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="test@example.com"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  v-model="newUser.password"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password123!"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  v-model="newUser.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Test User"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                <select 
                  v-model="newUser.userType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">User</option>
                  <option value="fundi">Fundi</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <button 
                @click="createUser"
                :disabled="creating || !connectionStatus.online"
                class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {{ creating ? '🔄 Creating...' : '✅ Create User' }}
              </button>
            </div>
          </div>

          <!-- Database Info -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold mb-4">📊 Database Status</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Database ID:</span>
                <span class="font-mono text-sm">{{ DATABASE_ID }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Users Collection:</span>
                <span class="font-mono text-sm">{{ COLLECTIONS.USERS }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Total Users:</span>
                <span class="font-semibold">{{ totalUsers }}</span>
              </div>
              <button 
                @click="listUsers"
                :disabled="loading || !connectionStatus.online"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {{ loading ? '🔄 Loading...' : '📋 List Users' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div v-if="result" class="mt-6 p-4 rounded-lg" :class="result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          <h3 class="font-semibold mb-2">{{ result.success ? '✅ Success' : '❌ Error' }}</h3>
          <p class="text-sm mb-2">{{ result.message }}</p>
          <pre v-if="result.details" class="text-xs bg-white p-2 rounded overflow-auto max-h-40">{{ result.details }}</pre>
        </div>

        <!-- Users List -->
        <div v-if="users.length > 0" class="mt-6">
          <h3 class="text-lg font-semibold mb-4">👥 Users in Database</h3>
          <div class="bg-gray-50 rounded-lg p-4 max-h-60 overflow-auto">
            <div v-for="user in users" :key="user.$id" class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
              <div>
                <div class="font-medium">{{ user.name }}</div>
                <div class="text-sm text-gray-600">{{ user.email }} • {{ user.userType }}</div>
              </div>
              <div class="text-xs text-gray-500">
                {{ new Date(user.createdAt).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-8 flex flex-wrap gap-4 justify-center">
          <router-link 
            to="/user-management" 
            class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            👥 Full User Management
          </router-link>
          <router-link 
            to="/force-online" 
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            🌐 Force Online Mode
          </router-link>
          <router-link 
            to="/" 
            class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            🏠 Main App
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  account, 
  databases, 
  DATABASE_ID, 
  COLLECTIONS
} from '@/services/appwrite'
import { ID } from 'appwrite'

// State
const connectionStatus = ref({ online: false })
const testing = ref(false)
const creating = ref(false)
const loading = ref(false)
const result = ref(null)
const users = ref([])
const totalUsers = ref(0)

const newUser = ref({
  email: 'test@example.com',
  password: 'Test@123',
  name: 'Test User',
  userType: 'user'
})

// Test basic connection
const testConnection = async () => {
  testing.value = true
  result.value = null
  
  try {
    console.log('🔍 Testing basic connection...')
    
    // Simple health check
    const healthResponse = await fetch('https://nyc.cloud.appwrite.io/v1/health', {
      method: 'GET',
      headers: {
        'X-Appwrite-Project': import.meta.env.VITE_APPWRITE_PROJECT_ID
      }
    })
    
    if (healthResponse.ok || healthResponse.status === 401) {
      connectionStatus.value.online = true
      result.value = {
        success: true,
        message: 'Connection successful!',
        details: `Health check: ${healthResponse.status} ${healthResponse.statusText}`
      }
    } else {
      throw new Error(`Health check failed: ${healthResponse.status}`)
    }
    
  } catch (error) {
    connectionStatus.value.online = false
    result.value = {
      success: false,
      message: 'Connection failed',
      details: error.message
    }
  } finally {
    testing.value = false
  }
}

// Create a user directly
const createUser = async () => {
  creating.value = true
  result.value = null
  
  try {
    console.log('📝 Creating user account...')
    
    // Create Appwrite account
    const newAccount = await account.create(
      ID.unique(),
      newUser.value.email,
      newUser.value.password,
      newUser.value.name
    )
    
    console.log('✅ Account created:', newAccount.$id)
    
    // Create user profile in database
    const userProfile = {
      userId: newAccount.$id,
      email: newUser.value.email,
      name: newUser.value.name,
      userType: newUser.value.userType,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      isActive: true
    }
    
    // Create without complex queries - simple document creation
    const userDoc = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      newAccount.$id,
      userProfile
    )
    
    console.log('✅ User profile created:', userDoc.$id)
    
    result.value = {
      success: true,
      message: `User ${newUser.value.name} created successfully!`,
      details: JSON.stringify({
        accountId: newAccount.$id,
        email: newUser.value.email,
        userType: newUser.value.userType,
        createdAt: userProfile.createdAt
      }, null, 2)
    }
    
    // Clear form
    newUser.value = {
      email: '',
      password: '',
      name: '',
      userType: 'user'
    }
    
    // Refresh user list
    await listUsers()
    
  } catch (error) {
    console.error('❌ Create user error:', error)
    
    let message = 'Failed to create user'
    if (error.code === 409) {
      message = 'User already exists'
    } else if (error.code === 400) {
      message = 'Invalid user data'
    } else if (error.message) {
      message = error.message
    }
    
    result.value = {
      success: false,
      message,
      details: `Error ${error.code}: ${error.message}`
    }
  } finally {
    creating.value = false
  }
}

// List users with simple query
const listUsers = async () => {
  loading.value = true
  result.value = null
  
  try {
    console.log('📋 Listing users...')
    
    // Simple query without complex ordering
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS
    )
    
    users.value = response.documents
    totalUsers.value = response.total
    
    result.value = {
      success: true,
      message: `Found ${response.documents.length} users`,
      details: `Total users in database: ${response.total}`
    }
    
  } catch (error) {
    console.error('❌ List users error:', error)
    
    result.value = {
      success: false,
      message: 'Failed to list users',
      details: `Error ${error.code}: ${error.message}`
    }
  } finally {
    loading.value = false
  }
}

// Initialize
onMounted(async () => {
  await testConnection()
  if (connectionStatus.value.online) {
    await listUsers()
  }
})
</script>
