<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Quick Test Login
        </h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Test authentication without database setup
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <form @submit.prevent="handleTestLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Test Email
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="test@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Test Password
            </label>
            <input
              v-model="form.password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="password123"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              User Type
            </label>
            <select
              v-model="form.userType"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="user">Individual User</option>
              <option value="fundi">Fundi</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div class="flex space-x-4">
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
            >
              {{ loading ? 'Testing...' : 'Test Login' }}
            </button>
            
            <button
              type="button"
              @click="handleTestSignup"
              :disabled="loading"
              class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
            >
              {{ loading ? 'Testing...' : 'Test Signup' }}
            </button>
          </div>

          <button
            type="button"
            @click="clearSession"
            :disabled="loading"
            class="w-full mt-4 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
          >
            {{ loading ? 'Clearing...' : 'Clear Active Session' }}
          </button>
        </form>

        <div v-if="result" class="mt-6 p-4 rounded-md" :class="[
          result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        ]">
          <h4 class="font-semibold">{{ result.success ? 'Success!' : 'Error' }}</h4>
          <p class="text-sm mt-1">{{ result.message }}</p>
          <div v-if="result.user" class="mt-2 text-xs">
            <p><strong>User ID:</strong> {{ result.user.$id }}</p>
            <p><strong>Email:</strong> {{ result.user.email }}</p>
            <p><strong>Name:</strong> {{ result.user.name }}</p>
          </div>
        </div>

        <div class="mt-6 text-center">
          <router-link to="/login" class="text-primary hover:text-primary-dark text-sm">
            ← Back to Regular Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { account } from '@/services/appwrite'
import { ID } from 'appwrite'

const router = useRouter()
const loading = ref(false)
const result = ref(null)

const form = reactive({
  email: 'test@example.com',
  password: 'password123',
  userType: 'user'
})

const clearSession = async () => {
  loading.value = true
  result.value = null
  
  try {
    // Try to get current user and delete session
    const user = await account.get()
    await account.deleteSession('current')
    
    result.value = {
      success: true,
      message: `Session cleared for ${user.email}. You can now try logging in again.`
    }
  } catch (error) {
    if (error.code === 401) {
      result.value = {
        success: true,
        message: 'No active session found. You can proceed with login/signup.'
      }
    } else {
      result.value = {
        success: false,
        message: `Failed to clear session: ${error.message}`
      }
    }
  } finally {
    loading.value = false
  }
}

const handleTestSignup = async () => {
  loading.value = true
  result.value = null
  
  try {
    // Create account with Appwrite
    const user = await account.create(
      ID.unique(),
      form.email,
      form.password,
      `Test ${form.userType.charAt(0).toUpperCase() + form.userType.slice(1)}`
    )
    
    result.value = {
      success: true,
      message: 'Account created successfully! You can now try logging in.',
      user: user
    }
    
    // Auto-login after successful signup
    setTimeout(() => {
      handleTestLogin()
    }, 2000)
    
  } catch (error) {
    result.value = {
      success: false,
      message: error.message
    }
  } finally {
    loading.value = false
  }
}

const handleTestLogin = async () => {
  loading.value = true
  result.value = null
  
  try {
    // Clear any existing session first
    try {
      const existingUser = await account.get()
      console.log('Found existing session, clearing it first...')
      await account.deleteSession('current')
    } catch (error) {
      // No existing session, which is fine
      console.log('No existing session found')
    }
    
    // Create session with Appwrite
    await account.createEmailSession(form.email, form.password)
    
    // Get user info
    const user = await account.get()
    
    result.value = {
      success: true,
      message: 'Login successful! Redirecting to dashboard...',
      user: user
    }
    
    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
    
  } catch (error) {
    result.value = {
      success: false,
      message: error.message
    }
  } finally {
    loading.value = false
  }
}
</script>
