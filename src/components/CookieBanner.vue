<template>
  <div 
    v-if="showBanner" 
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50"
  >
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <!-- Cookie Message -->
        <div class="flex-1">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-1">
              <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-1">
                🍪 We use cookies
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                We use cookies to enhance your experience, remember your preferences, and keep you logged in. 
                <button 
                  @click="showDetails = !showDetails"
                  class="text-primary hover:text-primary-dark underline"
                >
                  {{ showDetails ? 'Show less' : 'Learn more' }}
                </button>
              </p>
              
              <!-- Detailed Information -->
              <div v-if="showDetails" class="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="text-xs text-gray-600 dark:text-gray-300 space-y-2">
                  <div>
                    <strong>Essential cookies:</strong> Required for authentication and basic functionality
                  </div>
                  <div>
                    <strong>Preference cookies:</strong> Remember your settings like dark mode
                  </div>
                  <div>
                    <strong>Session data:</strong> Keep you logged in and maintain your session
                  </div>
                  <div class="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                    <button 
                      @click="clearAllData"
                      class="text-red-600 hover:text-red-700 underline text-xs mr-4"
                    >
                      Clear all stored data
                    </button>
                    <button 
                      @click="restartLogin"
                      class="text-blue-600 hover:text-blue-700 underline text-xs"
                    >
                      Restart login process
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            @click="acceptCookies"
            class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Accept All
          </button>
          <button
            @click="acceptEssential"
            class="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const showBanner = ref(false)
const showDetails = ref(false)

// Check if user has already made a choice
onMounted(() => {
  const cookieConsent = localStorage.getItem('fundihub-cookie-consent')
  if (!cookieConsent) {
    showBanner.value = true
  }
})

const acceptCookies = () => {
  localStorage.setItem('fundihub-cookie-consent', 'all')
  localStorage.setItem('fundihub-cookie-timestamp', new Date().toISOString())
  showBanner.value = false
}

const acceptEssential = () => {
  localStorage.setItem('fundihub-cookie-consent', 'essential')
  localStorage.setItem('fundihub-cookie-timestamp', new Date().toISOString())
  showBanner.value = false
}

const clearAllData = () => {
  if (confirm('This will clear all stored data and reload the page. Continue?')) {
    localStorage.clear()
    sessionStorage.clear()
    // Reload to fresh state
    window.location.href = '/session-reset'
  }
}

const restartLogin = async () => {
  try {
    // Logout current user if authenticated
    if (authStore.isAuthenticated) {
      await authStore.logout()
    }
    
    // Clear browser storage
    localStorage.removeItem('fundihub-cookie-consent')
    sessionStorage.clear()
    
    // Navigate to login page
    router.push('/auth/login')
    
    // Hide banner
    showBanner.value = false
  } catch (error) {
    console.error('Error restarting login:', error)
  }
}
</script>

<style scoped>
/* Ensure banner appears above everything */
.z-50 {
  z-index: 50;
}
</style>
