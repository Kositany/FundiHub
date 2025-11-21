<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-bold mb-4 text-red-600">🔄 Session Reset Tool</h2>
      
      <div class="space-y-4">
        <div class="bg-yellow-50 border border-yellow-200 rounded p-3">
          <p class="text-sm text-yellow-800">
            <strong>Note:</strong> This will completely clear all stored data including sessions, localStorage, and cookies.
          </p>
        </div>
        
        <div v-if="status" class="p-3 rounded" :class="status.includes('Success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          {{ status }}
        </div>
        
        <div class="space-y-2">
          <button 
            @click="clearSession" 
            class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Clear Appwrite Session
          </button>
          
          <button 
            @click="clearBrowserData" 
            class="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Clear All Browser Data
          </button>
          
          <button 
            @click="fullReset" 
            class="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Full Reset & Reload
          </button>
        </div>
        
        <div class="border-t pt-4">
          <button 
            @click="goToLogin" 
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Go to Fresh Login
          </button>
          
          <button 
            @click="goToHome" 
            class="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-2"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { account } from '@/services/appwrite'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const status = ref('')

const clearSession = async () => {
  try {
    await account.deleteSession('current')
    authStore.user = null
    status.value = 'Success: Appwrite session cleared'
  } catch (error) {
    status.value = `Session clear result: ${error.message}`
  }
}

const clearBrowserData = () => {
  try {
    // Clear localStorage
    localStorage.clear()
    
    // Clear sessionStorage
    sessionStorage.clear()
    
    // Clear auth store
    authStore.user = null
    authStore.initialized = false
    
    status.value = 'Success: All browser data cleared'
  } catch (error) {
    status.value = `Error clearing browser data: ${error.message}`
  }
}

const fullReset = async () => {
  try {
    // Clear Appwrite session
    try {
      await account.deleteSession('current')
    } catch (e) {
      // Ignore if no session exists
    }
    
    // Clear all browser data
    localStorage.clear()
    sessionStorage.clear()
    
    // Clear auth store
    authStore.user = null
    authStore.initialized = false
    
    status.value = 'Success: Full reset complete. Reloading...'
    
    // Wait a moment then reload
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  } catch (error) {
    status.value = `Error during full reset: ${error.message}`
  }
}

const goToLogin = () => {
  clearBrowserData()
  router.push('/login')
}

const goToHome = () => {
  clearBrowserData()
  router.push('/')
}
</script>
