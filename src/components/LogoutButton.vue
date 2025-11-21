<template>
  <button
    @click="handleLogout"
    :disabled="authStore.loading"
    :class="[
      'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200',
      variant === 'primary' ? 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500' :
      variant === 'secondary' ? 'text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500' :
      'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      authStore.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
  >
    <svg 
      v-if="!authStore.loading"
      class="w-4 h-4 mr-2" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
    
    <svg 
      v-else
      class="w-4 h-4 mr-2 animate-spin" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    
    {{ authStore.loading ? 'Logging out...' : 'Logout' }}
  </button>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // 'primary', 'secondary', 'default'
    validator: (value) => ['primary', 'secondary', 'default'].includes(value)
  },
  redirectTo: {
    type: String,
    default: '/' // Where to redirect after logout
  }
})

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.logout()
    
    // Redirect to specified route
    router.push(props.redirectTo)
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
