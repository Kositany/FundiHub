<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Loading Dashboard...</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Redirecting to your dashboard based on account type</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  // Wait a moment for auth to be ready
  await new Promise(resolve => setTimeout(resolve, 100))
  
  console.log('🔄 Dashboard redirect - User type:', authStore.user?.userType)
  
  // Determine the correct dashboard based on user type
  let userType = authStore.user?.userType || 'user'
  
  // Map certain user types to the correct dashboard routes
  if (userType === 'individual') {
    userType = 'fundi' // Individual professionals go to fundi dashboard
  }
  
  // Ensure we only have valid dashboard types
  const validTypes = ['user', 'fundi', 'business']
  if (!validTypes.includes(userType)) {
    userType = 'user' // Default fallback
  }
  
  const dashboardPath = `/dashboard/${userType}`
  
  console.log('🎯 Redirecting to:', dashboardPath)
  
  // Redirect to the appropriate dashboard
  router.replace(dashboardPath)
})
</script>
