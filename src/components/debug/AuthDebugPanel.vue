<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">🔧 Authentication Debug Panel</h1>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Diagnose and fix authentication issues</p>
            </div>
            <router-link 
              to="/" 
              class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              ← Back to Home
            </router-link>
          </div>
        </div>
      </div>

      <!-- Current Status -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">Authentication Status</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full" :class="authStore.isAuthenticated ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'">
                <svg class="w-6 h-6" :class="authStore.isAuthenticated ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="authStore.isAuthenticated" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Authentication</p>
              <p class="text-lg font-semibold" :class="authStore.isAuthenticated ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ authStore.isAuthenticated ? 'Active' : 'Inactive' }}
              </p>
            </div>

            <div class="text-center">
              <div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">User Type</p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {{ authStore.user?.userType || 'None' }}
              </p>
            </div>

            <div class="text-center">
              <div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full" :class="authStore.isOnboardingComplete ? 'bg-green-100 dark:bg-green-900' : 'bg-orange-100 dark:bg-orange-900'">
                <svg class="w-6 h-6" :class="authStore.isOnboardingComplete ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="authStore.isOnboardingComplete" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Onboarding</p>
              <p class="text-lg font-semibold" :class="authStore.isOnboardingComplete ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'">
                {{ authStore.isOnboardingComplete ? 'Complete' : 'Incomplete' }}
              </p>
            </div>

            <div class="text-center">
              <div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-700">
                <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {{ authStore.user?.email || 'None' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Debug Results -->
      <div v-if="debugResults" class="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">Diagnostic Results</h2>
        </div>
        <div class="p-6">
          <div v-if="debugResults.issue === 'onboarding_incomplete'" class="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <svg class="w-6 h-6 text-orange-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-orange-800 dark:text-orange-200">Onboarding Incomplete</h3>
              <p class="mt-1 text-sm text-orange-700 dark:text-orange-300">Your account exists but the onboarding process hasn't been completed. This prevents access to dashboard features.</p>
            </div>
          </div>
          
          <div v-else-if="debugResults.issue === 'user_document_missing'" class="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <svg class="w-6 h-6 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-red-800 dark:text-red-200">User Profile Missing</h3>
              <p class="mt-1 text-sm text-red-700 dark:text-red-300">Your authentication session exists but your user profile is missing from the database.</p>
            </div>
          </div>
          
          <div v-else-if="debugResults.issue === 'no_session'" class="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <svg class="w-6 h-6 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636"></path>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-red-800 dark:text-red-200">No Active Session</h3>
              <p class="mt-1 text-sm text-red-700 dark:text-red-300">You are not currently logged in. Please login to access your account.</p>
            </div>
          </div>
          
          <div v-else-if="debugResults.issue === null" class="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <svg class="w-6 h-6 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-green-800 dark:text-green-200">Authentication Healthy</h3>
              <p class="mt-1 text-sm text-green-700 dark:text-green-300">No authentication issues detected. Your dashboard should be accessible.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">Diagnostic Tools</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              @click="runDebug"
              :disabled="loading"
              class="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              {{ loading ? 'Analyzing...' : 'Run Diagnostics' }}
            </button>

            <button
              @click="refreshAuthStore"
              :disabled="loading"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {{ loading ? 'Refreshing...' : 'Refresh Auth State' }}
            </button>
          </div>

          <!-- Force Complete Onboarding -->
          <div v-if="debugResults?.issue === 'onboarding_incomplete'" class="mt-6">
            <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <div class="flex items-center mb-4">
                <svg class="w-6 h-6 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <h3 class="text-lg font-medium text-orange-800 dark:text-orange-200">Quick Fix Available</h3>
              </div>
              <p class="text-sm text-orange-700 dark:text-orange-300 mb-4">Complete your onboarding instantly by selecting your account type:</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  @click="forceComplete('user')"
                  :disabled="loading"
                  class="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Complete as User
                </button>
                <button
                  @click="forceComplete('fundi')"
                  :disabled="loading"
                  class="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                  Complete as Fundi
                </button>
                <button
                  @click="forceComplete('business')"
                  :disabled="loading"
                  class="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Complete as Business
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Navigation -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">Dashboard Access</h2>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Try accessing your dashboard directly:</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <router-link
              to="/dashboard/user"
              class="flex items-center justify-center px-4 py-3 border border-blue-300 dark:border-blue-600 text-sm font-medium rounded-md text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              User Dashboard
            </router-link>
            <router-link
              to="/dashboard/fundi"
              class="flex items-center justify-center px-4 py-3 border border-green-300 dark:border-green-600 text-sm font-medium rounded-md text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
              Fundi Dashboard
            </router-link>
            <router-link
              to="/dashboard/business"
              class="flex items-center justify-center px-4 py-3 border border-purple-300 dark:border-purple-600 text-sm font-medium rounded-md text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              Business Dashboard
            </router-link>
          </div>
        </div>
      </div>

      <!-- Raw Debug Data -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="px-6 py-4">
          <details class="group">
            <summary class="flex items-center justify-between cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <span class="text-sm font-medium">Raw Debug Data</span>
              <svg class="w-5 h-5 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <div class="mt-4">
              <pre class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-xs overflow-auto max-h-96 text-gray-800 dark:text-gray-200">{{ JSON.stringify(debugResults, null, 2) }}</pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotifications } from '@/composables/useNotifications'
import { debugAuthState, forceCompleteOnboarding } from '@/utils/debugAuth'

const router = useRouter()
const authStore = useAuthStore()
const { showSuccess, showError } = useNotifications()

const loading = ref(false)
const debugResults = ref(null)

const runDebug = async () => {
  loading.value = true
  try {
    console.log('🔍 Running authentication debug...')
    const results = await debugAuthState()
    debugResults.value = results
    console.log('Debug results:', results)
    
    if (results.issue) {
      showError('Authentication Issue Found', `Issue: ${results.issue}`)
    } else {
      showSuccess('Debug Complete', 'No authentication issues found!')
    }
  } catch (error) {
    console.error('Debug failed:', error)
    showError('Debug Failed', error.message)
  } finally {
    loading.value = false
  }
}

const refreshAuthStore = async () => {
  loading.value = true
  try {
    await authStore.initialize()
    showSuccess('Auth Store Refreshed', 'Authentication state has been refreshed')
  } catch (error) {
    console.error('Refresh failed:', error)
    showError('Refresh Failed', error.message)
  } finally {
    loading.value = false
  }
}

const forceComplete = async (userType) => {
  loading.value = true
  try {
    console.log(`🔧 Force completing onboarding as ${userType}...`)
    const updatedUser = await forceCompleteOnboarding(userType)
    
    showSuccess(
      'Onboarding Completed!', 
      `You can now access the ${userType} dashboard`
    )
    
    // Refresh debug results
    await runDebug()
    
    // Navigate to dashboard
    setTimeout(() => {
      router.push(`/dashboard/${userType}`)
    }, 1000)
  } catch (error) {
    console.error('Force complete failed:', error)
    showError('Force Complete Failed', error.message)
  } finally {
    loading.value = false
  }
}
</script>
