<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">🌐 Force Online Mode</h1>
          <p class="text-gray-600">Enable online mode and test database connectivity</p>
        </div>

        <!-- Current Status -->
        <div class="mb-6 p-4 rounded-lg" :class="auth.appwriteAccessible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
          <div class="flex items-center space-x-2">
            <div :class="[
              'w-4 h-4 rounded-full',
              auth.appwriteAccessible ? 'bg-green-400' : 'bg-red-400'
            ]"></div>
            <span class="font-medium" :class="auth.appwriteAccessible ? 'text-green-800' : 'text-red-800'">
              Current Status: {{ auth.appwriteAccessible ? 'Online' : 'Offline' }}
            </span>
          </div>
          <div class="mt-2 text-sm" :class="auth.appwriteAccessible ? 'text-green-700' : 'text-red-700'">
            <div>Offline Mode: {{ auth.offlineMode ? 'Enabled' : 'Disabled' }}</div>
            <div>Database Access: {{ auth.appwriteAccessible ? 'Available' : 'Unavailable' }}</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="space-y-4">
          <!-- Force Online -->
          <button 
            @click="forceOnline"
            :disabled="loading"
            class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg v-if="loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>🌐 Force Online Mode</span>
            </div>
          </button>

          <!-- Test Connection -->
          <button 
            @click="testConnection"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg v-if="testing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>🔍 Test Database Connection</span>
            </div>
          </button>

          <!-- Login as Admin -->
          <button 
            @click="loginAsAdmin"
            :disabled="loading || auth.isAuthenticated"
            class="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg v-if="authenticating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="auth.isAuthenticated">✅ Already Logged In</span>
              <span v-else>🔑 Login as Admin</span>
            </div>
          </button>
        </div>

        <!-- Current User Info -->
        <div v-if="auth.isAuthenticated" class="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 class="font-semibold text-blue-800 mb-2">Current User</h3>
          <div class="text-sm text-blue-700 space-y-1">
            <div><strong>Name:</strong> {{ auth.user?.name }}</div>
            <div><strong>Email:</strong> {{ auth.user?.email }}</div>
            <div><strong>Type:</strong> {{ auth.user?.userType }}</div>
            <div><strong>Mode:</strong> {{ auth.user?.offlineMode ? 'Offline' : 'Online' }}</div>
          </div>
        </div>

        <!-- Test Results -->
        <div v-if="result" class="mt-6 p-4 rounded-lg" :class="result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          <h3 class="font-semibold mb-2">{{ result.success ? '✅ Success' : '❌ Error' }}</h3>
          <div class="text-sm">
            <p>{{ result.message }}</p>
            <pre v-if="result.details" class="mt-2 text-xs bg-white p-2 rounded overflow-auto">{{ result.details }}</pre>
          </div>
        </div>

        <!-- Navigation -->
        <div class="mt-8 text-center space-y-2">
          <router-link 
            to="/user-management" 
            class="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            👥 User Management
          </router-link>
          <div class="space-x-4 text-sm">
            <router-link to="/mobile-hub" class="text-blue-600 hover:text-blue-800">Mobile Hub</router-link>
            <router-link to="/" class="text-gray-600 hover:text-gray-800">Main App</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const loading = ref(false)
const testing = ref(false)
const authenticating = ref(false)
const result = ref(null)

// Force online mode
const forceOnline = () => {
  loading.value = true
  result.value = null
  
  try {
    auth.forceOnlineMode()
    result.value = {
      success: true,
      message: 'Online mode enabled successfully!',
      details: 'Database operations will now be attempted regardless of connectivity tests.'
    }
  } catch (error) {
    result.value = {
      success: false,
      message: 'Failed to enable online mode',
      details: error.message
    }
  } finally {
    loading.value = false
  }
}

// Test database connection
const testConnection = async () => {
  testing.value = true
  result.value = null
  
  try {
    const apiOnline = await auth.testAppwriteConnection()
    const dbOnline = await auth.testDatabaseConnection()
    
    result.value = {
      success: apiOnline && dbOnline,
      message: apiOnline && dbOnline 
        ? 'Database connection successful!' 
        : 'Database connection failed',
      details: JSON.stringify({
        apiConnection: apiOnline ? 'Success' : 'Failed',
        databaseAccess: dbOnline ? 'Success' : 'Failed',
        timestamp: new Date().toISOString()
      }, null, 2)
    }
  } catch (error) {
    result.value = {
      success: false,
      message: 'Connection test failed',
      details: error.message
    }
  } finally {
    testing.value = false
  }
}

// Login as admin
const loginAsAdmin = async () => {
  authenticating.value = true
  result.value = null
  
  try {
    const loginResult = await auth.login('useradmin@fundihub.com', 'Admin@123')
    
    if (loginResult.success) {
      result.value = {
        success: true,
        message: 'Admin login successful!',
        details: `Logged in as ${loginResult.user.name}. Database access is now available.`
      }
    } else {
      throw new Error('Login failed')
    }
  } catch (error) {
    result.value = {
      success: false,
      message: 'Admin login failed',
      details: error.message
    }
  } finally {
    authenticating.value = false
  }
}
</script>
