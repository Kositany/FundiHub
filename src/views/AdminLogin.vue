<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-bold mb-4">Admin Login Helper</h2>
      
      <div class="space-y-4">
        <div>
          <strong>Status:</strong> {{ status }}
        </div>
        
        <div v-if="error" class="text-red-600">
          <strong>Error:</strong> {{ error }}
        </div>
        
        <div v-if="user" class="text-green-600">
          <strong>Logged in as:</strong> {{ user.email }}<br>
          <strong>User Type:</strong> {{ user.userType }}<br>
          <strong>Onboarding:</strong> {{ user.onboardingComplete || user.onboardingCompleted ? 'Complete' : 'Incomplete' }}
        </div>
        
        <div class="space-y-2">
          <button 
            @click="loginAsFundiAdmin" 
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            :disabled="loading"
          >
            {{ loading ? 'Logging in...' : 'Login as Fundi Admin' }}
          </button>
          
          <button 
            @click="loginAsUserAdmin" 
            class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            :disabled="loading"
          >
            {{ loading ? 'Logging in...' : 'Login as User Admin' }}
          </button>
          
          <button 
            @click="loginAsBusinessAdmin" 
            class="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            :disabled="loading"
          >
            {{ loading ? 'Logging in...' : 'Login as Business Admin' }}
          </button>
        </div>
        
        <button 
          @click="logout" 
          class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
        
        <button 
          @click="goToDashboard" 
          class="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          v-if="user"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const status = ref('Ready')
const error = ref('')
const user = ref(null)
const loading = ref(false)

const loginAsFundiAdmin = async () => {
  await login('fundiadmin@fundihub.com', 'password123')
}

const loginAsUserAdmin = async () => {
  await login('useradmin@fundihub.com', 'password123')
}

const loginAsBusinessAdmin = async () => {
  await login('businessadmin@fundihub.com', 'password123')
}

const login = async (email, password) => {
  loading.value = true
  error.value = ''
  status.value = 'Logging in...'
  
  try {
    const result = await authStore.login(email, password)
    if (result.success) {
      status.value = 'Login successful'
      user.value = result.user
    } else {
      error.value = 'Login failed'
    }
  } catch (err) {
    error.value = err.message
    status.value = 'Login failed'
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  try {
    await authStore.logout()
    status.value = 'Logged out'
    user.value = null
    error.value = ''
  } catch (err) {
    error.value = err.message
  }
}

const goToDashboard = () => {
  if (user.value?.userType === 'fundi') {
    router.push('/dashboard/fundi')
  } else if (user.value?.userType === 'business') {
    router.push('/dashboard/business')
  } else {
    router.push('/dashboard/user')
  }
}

// Check current auth state
if (authStore.isAuthenticated) {
  user.value = authStore.user
  status.value = 'Already logged in'
}
</script>
