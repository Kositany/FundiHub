<template>
  <div id="app" :class="{ 'dark': isDark }" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Spectacular Loading Screen -->
    <SpectacularLoader 
      v-if="showLoader" 
      :duration="3000"
      :stages="loadingStages"
      @loaded="handleLoaderComplete"
    />
    
    <!-- Global Loading Overlay -->
    <LoadingOverlay v-if="authStore.loading && !showLoader" />
    
    <!-- Toast Container -->
    <div id="toast-container"></div>
    
    <!-- Main Content wrapped in Error Boundary -->
    <ErrorBoundary>
      <!-- Navigation -->
      <AppNavigation />
      
      <main class="min-h-screen">
        <RouterView />
      </main>
    </ErrorBoundary>
    
    <!-- Cookie Banner -->
    <CookieBanner />
    
    <!-- Notification Container -->
    <NotificationContainer />
    
    <!-- PWA Install Component -->
    <PWAInstall />
    
    <!-- Debug Button (only in development) -->
    <DebugFloatingButton v-if="isDevelopment" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, provide, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDark, useToggle } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue'
import CookieBanner from '@/components/CookieBanner.vue'
import NotificationContainer from '@/components/ui/NotificationContainer.vue'
import AppNavigation from '@/components/AppNavigation.vue'
import DebugFloatingButton from '@/components/debug/DebugFloatingButton.vue'
import PWAInstall from '@/components/PWAInstall.vue'
import SpectacularLoader from '@/components/SpectacularLoader.vue'

// GSAP Plugins
gsap.registerPlugin(ScrollTrigger)

// Stores
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Dark Mode
const isDark = useDark()
const toggleDark = useToggle(isDark)
provide('darkMode', { isDark, toggleDark })

// Development mode check
const isDevelopment = computed(() => import.meta.env.DEV)

// Spectacular Loader State
const showLoader = ref(true)
const loadingStages = [
  'Connecting to FundiHub...',
  'Loading your dashboard...',
  'Finding nearby fundis...',
  'Preparing your experience...',
  'Almost ready!'
]

// Handle loader completion
function handleLoaderComplete() {
  showLoader.value = false
  console.log('🎬 Spectacular loader completed! Welcome to FundiHub!')
}

// Lifecycle
onMounted(async () => {
  // Initialize authentication
  await authStore.initialize()
  
  // Initialize GSAP ScrollTrigger
  ScrollTrigger.refresh()
  
  // Initialize award-winning animations
  const { initializeAllAnimations } = await import('@/utils/animations')
  initializeAllAnimations()
  
  // Initialize PWA features
  const { initializePWA } = await import('@/utils/pwa')
  initializePWA()
  
  // Setup debug utilities in development
  if (import.meta.env.DEV) {
    const { setupDebugGlobals } = await import('@/utils/debugAuth')
    setupDebugGlobals()
  }
})

// Watch for route changes to refresh ScrollTrigger
watch(() => route.path, () => {
  ScrollTrigger.refresh()
})
</script>

<style scoped>
#app {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
:deep(*) {
  scrollbar-width: thin;
  scrollbar-color: #FE433F #f1f1f1;
}

:deep(*::-webkit-scrollbar) {
  width: 8px;
}

:deep(*::-webkit-scrollbar-track) {
  background: #f1f1f1;
}

:deep(*::-webkit-scrollbar-thumb) {
  background: #FE433F;
  border-radius: 4px;
}

:deep(*::-webkit-scrollbar-thumb:hover) {
  background: #e33d38;
}

/* PWA specific styles */
@media (display-mode: standalone) {
  #app {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
