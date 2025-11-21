<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">📱 Mobile Hub</h1>
          <p class="text-gray-600 text-sm">Quick access for mobile testing</p>
        </div>

        <!-- Device Status -->
        <div class="bg-blue-50 rounded-lg p-4 mb-6">
          <h2 class="font-semibold text-blue-800 mb-2">Device Status</h2>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span>Connection:</span>
              <span class="font-mono">{{ connectionType }}</span>
            </div>
            <div class="flex justify-between">
              <span>Screen:</span>
              <span class="font-mono">{{ screenInfo }}</span>
            </div>
            <div class="flex justify-between">
              <span>Time:</span>
              <span class="font-mono">{{ currentTime }}</span>
            </div>
            <div class="flex justify-between">
              <span>Appwrite:</span>
              <span class="font-mono" :class="auth.appwriteAccessible ? 'text-green-600' : 'text-red-600'">
                {{ auth.appwriteAccessible ? 'Online' : 'Offline' }}
              </span>
            </div>
            <div v-if="auth.offlineMode" class="flex justify-between">
              <span>Mode:</span>
              <span class="font-mono text-orange-600">Offline Mode</span>
            </div>
          </div>
        </div>

        <!-- Offline Mode Alert -->
        <div v-if="auth.offlineMode" class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <span class="text-orange-800 font-medium">Offline Mode Active</span>
          </div>
          <p class="text-orange-700 text-sm mt-2">
            Cannot reach Appwrite backend. Using offline mode with limited features.
          </p>
        </div>

        <!-- Quick Actions -->
        <div class="space-y-3">
          <!-- Test Appwrite Connection -->
          <button 
            @click="testConnection"
            :disabled="connectionTesting"
            class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg v-if="connectionTesting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ connectionTesting ? 'Testing...' : '🔗 Test Connection' }}</span>
            </div>
          </button>

          <!-- Login Test -->
          <button 
            @click="testLogin"
            :disabled="loginTesting"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg v-if="loginTesting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ loginTesting ? 'Testing Login...' : '🔑 Test Login' }}</span>
            </div>
          </button>

          <!-- Offline Login -->
          <button 
            @click="testOfflineLogin"
            :disabled="offlineLoginTesting"
            class="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg v-if="offlineLoginTesting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ offlineLoginTesting ? 'Testing...' : '📱 Force Offline Login' }}</span>
            </div>
          </button>

          <!-- Network Diagnostic -->
          <router-link 
            to="/network-diagnostic"
            class="block w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-green-700"
          >
            🔍 Network Diagnostic
          </router-link>

          <!-- Connection Test -->
          <router-link 
            to="/test-connection"
            class="block w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-purple-700"
          >
            🔗 Full Connection Test
          </router-link>

          <!-- Profile Fixer -->
          <router-link 
            to="/profile-fixer"
            class="block w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-orange-700"
          >
            🔧 Profile Fixer
          </router-link>

          <!-- User Management -->
          <router-link 
            to="/user-management"
            class="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-indigo-700"
          >
            👥 User Management
          </router-link>

          <!-- Dashboard (if logged in) -->
          <router-link 
            v-if="auth.isAuthenticated"
            to="/dashboard"
            class="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-indigo-700"
          >
            📊 Go to Dashboard
          </router-link>

          <!-- Login Page -->
          <router-link 
            v-else
            to="/offline-login"
            class="block w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-gray-700"
          >
            🔑 Offline Login Page
          </router-link>
        </div>

        <!-- Test Results -->
        <div v-if="testResult" class="mt-6 p-4 rounded-lg" :class="testResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          <h3 class="font-semibold mb-2">{{ testResult.success ? '✅ Success' : '❌ Failed' }}</h3>
          <p class="text-sm">{{ testResult.message }}</p>
        </div>

        <!-- User Info (if logged in) -->
        <div v-if="auth.isAuthenticated" class="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 class="font-semibold text-green-800 mb-2">Current User</h3>
          <div class="text-sm text-green-700 space-y-1">
            <div><strong>Email:</strong> {{ auth.user?.email }}</div>
            <div><strong>Type:</strong> {{ auth.user?.userType }}</div>
            <div><strong>Name:</strong> {{ auth.user?.name || 'Not set' }}</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center text-xs text-gray-500">
        Fundi Hub Mobile Testing v1.0
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const loginTesting = ref(false)
const connectionTesting = ref(false)
const offlineLoginTesting = ref(false)
const testResult = ref(null)
const currentTime = ref('')
const connectionType = ref('unknown')
const screenInfo = ref('')

// Test connection to Appwrite
const testConnection = async () => {
  connectionTesting.value = true
  testResult.value = null
  
  try {
    const isOnline = await auth.testAppwriteConnection()
    
    if (isOnline) {
      testResult.value = {
        success: true,
        message: 'Appwrite backend is accessible! You can use all features.'
      }
    } else {
      testResult.value = {
        success: false,
        message: 'Appwrite backend not accessible. Offline mode will be used with limited features.'
      }
    }
  } catch (error) {
    testResult.value = {
      success: false,
      message: `Connection test failed: ${error.message}`
    }
  } finally {
    connectionTesting.value = false
  }
}

// Test offline login directly
const testOfflineLogin = async () => {
  offlineLoginTesting.value = true
  testResult.value = null
  
  try {
    const result = auth.offlineLogin('useradmin@fundihub.com', 'Admin@123')
    
    if (result.success) {
      testResult.value = {
        success: true,
        message: `Offline login successful! Logged in as ${result.user.name}`
      }
    } else {
      testResult.value = {
        success: false,
        message: 'Offline login failed'
      }
    }
  } catch (error) {
    testResult.value = {
      success: false,
      message: error.message || 'Offline login failed with unknown error'
    }
  } finally {
    offlineLoginTesting.value = false
  }
}

// Test admin login
const testLogin = async () => {
  loginTesting.value = true
  testResult.value = null
  
  try {
    const result = await auth.login('useradmin@fundihub.com', 'Admin@123')
    
    if (result.success) {
      testResult.value = {
        success: true,
        message: `Successfully logged in as ${result.user.name || result.user.email}`
      }
    } else {
      testResult.value = {
        success: false,
        message: 'Login failed - no success flag returned'
      }
    }
  } catch (error) {
    testResult.value = {
      success: false,
      message: error.message || 'Login failed with unknown error'
    }
  } finally {
    loginTesting.value = false
  }
}

// Update time every second
const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString()
}

// Get device info
const getDeviceInfo = () => {
  // Connection type
  if (navigator.connection) {
    connectionType.value = navigator.connection.effectiveType || 'unknown'
  } else {
    connectionType.value = 'unknown'
  }
  
  // Screen info
  screenInfo.value = `${screen.width}x${screen.height}`
}

onMounted(() => {
  updateTime()
  getDeviceInfo()
  
  // Update time every second
  setInterval(updateTime, 1000)
  
  // Initialize auth
  auth.initialize()
})
</script>
