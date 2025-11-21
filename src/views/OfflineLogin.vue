<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">📱 Offline Login</h1>
          <p class="text-gray-600 text-sm">Login even when Appwrite is not accessible</p>
        </div>

        <!-- Connection Status -->
        <div class="mb-6 p-4 rounded-lg" :class="connectionStatus.online ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'">
          <div class="flex items-center space-x-2">
            <div :class="[
              'w-3 h-3 rounded-full',
              connectionStatus.online ? 'bg-green-400' : 'bg-orange-400'
            ]"></div>
            <span class="font-medium" :class="connectionStatus.online ? 'text-green-800' : 'text-orange-800'">
              {{ connectionStatus.online ? 'Backend Online' : 'Backend Offline' }}
            </span>
          </div>
          <p class="text-sm mt-1" :class="connectionStatus.online ? 'text-green-700' : 'text-orange-700'">
            {{ connectionStatus.message }}
          </p>
        </div>

        <!-- Test Accounts Info -->
        <div class="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 class="font-semibold text-blue-800 mb-2">📋 Test Accounts</h3>
          <div class="space-y-2 text-sm text-blue-700">
            <div>
              <strong>Business Admin:</strong><br>
              Email: useradmin@fundihub.com<br>
              Password: Admin@123
            </div>
            <div>
              <strong>Fundi Admin:</strong><br>
              Email: fundiadmin@fundihub.com<br>
              Password: Admin@123
            </div>
            <div>
              <strong>Test User:</strong><br>
              Email: test@fundihub.com<br>
              Password: Test@123
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div class="space-y-2">
            <!-- Regular Login -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div class="flex items-center justify-center space-x-2">
                <svg v-if="loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ loading ? 'Logging in...' : 'Login' }}</span>
              </div>
            </button>

            <!-- Force Offline Login -->
            <button
              type="button"
              @click="forceOfflineLogin"
              :disabled="loading"
              class="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Force Offline Login
            </button>
          </div>
        </form>

        <!-- Quick Test Buttons -->
        <div class="mt-6 space-y-2">
          <h4 class="text-sm font-medium text-gray-700">Quick Test:</h4>
          <div class="grid grid-cols-1 gap-2">
            <button
              @click="fillCredentials('useradmin@fundihub.com', 'Admin@123')"
              class="px-3 py-2 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200"
            >
              Use Business Admin
            </button>
            <button
              @click="fillCredentials('fundiadmin@fundihub.com', 'Admin@123')"
              class="px-3 py-2 bg-purple-100 text-purple-800 rounded text-sm hover:bg-purple-200"
            >
              Use Fundi Admin
            </button>
            <button
              @click="fillCredentials('test@fundihub.com', 'Test@123')"
              class="px-3 py-2 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
            >
              Use Test User
            </button>
          </div>
        </div>

        <!-- Error/Success Messages -->
        <div v-if="message" class="mt-4 p-3 rounded-lg" :class="message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          <p class="text-sm">{{ message.text }}</p>
        </div>

        <!-- Navigation -->
        <div class="mt-6 text-center space-y-2">
          <router-link to="/mobile-hub" class="block text-blue-600 hover:text-blue-800 text-sm">
            ← Back to Mobile Hub
          </router-link>
          <router-link to="/" class="block text-gray-600 hover:text-gray-800 text-sm">
            Go to Main App
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const message = ref(null)
const connectionStatus = ref({
  online: false,
  message: 'Checking connection...'
})

// Check connection status on mount
const checkConnection = async () => {
  try {
    const isOnline = await auth.testAppwriteConnection()
    connectionStatus.value = {
      online: isOnline,
      message: isOnline 
        ? 'All features available' 
        : 'Using offline mode with limited features'
    }
  } catch (error) {
    connectionStatus.value = {
      online: false,
      message: 'Connection test failed'
    }
  }
}

// Handle login
const handleLogin = async () => {
  loading.value = true
  message.value = null
  
  try {
    const result = await auth.login(form.value.email, form.value.password)
    
    if (result.success) {
      message.value = {
        type: 'success',
        text: `Login successful! Redirecting to dashboard...`
      }
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } else {
      message.value = {
        type: 'error',
        text: 'Login failed. Please check your credentials.'
      }
    }
  } catch (error) {
    message.value = {
      type: 'error',
      text: error.message || 'Login failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// Force offline login
const forceOfflineLogin = async () => {
  loading.value = true
  message.value = null
  
  try {
    const result = auth.offlineLogin(form.value.email, form.value.password)
    
    if (result.success) {
      message.value = {
        type: 'success',
        text: `Offline login successful! Redirecting to dashboard...`
      }
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } else {
      message.value = {
        type: 'error',
        text: 'Offline login failed. Please use test credentials.'
      }
    }
  } catch (error) {
    message.value = {
      type: 'error',
      text: error.message || 'Offline login failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// Fill credentials helper
const fillCredentials = (email, password) => {
  form.value.email = email
  form.value.password = password
}

onMounted(() => {
  checkConnection()
  auth.initialize()
})
</script>
