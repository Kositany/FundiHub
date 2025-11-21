<template>
  <div>
    <!-- Install Button/Banner for supported platforms -->
    <div v-if="showInstallPrompt" class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              Install FundiHub App
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ installMessage }}
            </p>
          </div>
          <div class="flex-shrink-0 flex space-x-2">
            <button
              @click="dismissInstallPrompt"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-3 flex space-x-2">
          <button
            @click="handleInstall"
            class="flex-1 bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            {{ installButtonText }}
          </button>
          <button
            @click="dismissInstallPrompt"
            class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400"
          >
            Later
          </button>
        </div>
      </div>
    </div>

    <!-- iOS Installation Instructions Modal -->
    <div
      v-if="showIOSInstructions"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      @click="closeIOSInstructions"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Install FundiHub on iOS
          </h3>
          <button
            @click="closeIOSInstructions"
            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-blue-600 dark:text-blue-400">1</span>
            </div>
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Tap the <strong>Share</strong> button in Safari
              </p>
              <div class="mt-2 flex items-center space-x-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
                <span class="text-xs text-gray-500">Usually at the bottom of the screen</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-blue-600 dark:text-blue-400">2</span>
            </div>
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Scroll down and tap <strong>"Add to Home Screen"</strong>
              </p>
              <div class="mt-2 flex items-center space-x-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span class="text-xs text-gray-500">Look for the plus icon</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-blue-600 dark:text-blue-400">3</span>
            </div>
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Tap <strong>"Add"</strong> to install FundiHub
              </p>
              <div class="mt-2 flex items-center space-x-2">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-xs text-gray-500">The app will appear on your home screen</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p class="text-xs text-gray-500 dark:text-gray-400 text-center">
            Once installed, you can access FundiHub like any other app!
          </p>
        </div>
      </div>
    </div>

    <!-- Update Available Notification -->
    <div v-if="updateAvailable" class="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <div class="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-green-800 dark:text-green-200">
              Update Available
            </h3>
            <p class="text-xs text-green-700 dark:text-green-300 mt-1">
              A new version of FundiHub is available.
            </p>
          </div>
        </div>
        <div class="mt-3 flex space-x-2">
          <button
            @click="updateApp"
            class="bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Update Now
          </button>
          <button
            @click="dismissUpdate"
            class="text-sm font-medium text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Reactive state
const showInstallPrompt = ref(false)
const showIOSInstructions = ref(false)
const updateAvailable = ref(false)
const deferredPrompt = ref(null)
const isIOS = ref(false)
const isAndroid = ref(false)
const isDesktop = ref(false)
const isInstalled = ref(false)

// Computed properties for messages
const installMessage = computed(() => {
  if (isIOS.value) {
    return 'Add to your home screen for the best experience'
  } else if (isAndroid.value) {
    return 'Install the app for faster access and offline features'
  } else {
    return 'Install the desktop app for quick access'
  }
})

const installButtonText = computed(() => {
  if (isIOS.value) {
    return 'Show Instructions'
  } else {
    return 'Install Now'
  }
})

// Platform detection
const detectPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  
  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    isIOS.value = true
  }
  
  // Android detection
  if (/android/i.test(userAgent)) {
    isAndroid.value = true
  }
  
  // Desktop detection
  if (!isIOS.value && !isAndroid.value) {
    isDesktop.value = true
  }
  
  // Check if already installed
  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
    isInstalled.value = true
  }
  
  // Check for iOS Safari standalone mode
  if (window.navigator.standalone === true) {
    isInstalled.value = true
  }
}

// Check if should show install prompt
const shouldShowInstallPrompt = () => {
  // Don't show if already installed
  if (isInstalled.value) return false
  
  // Check localStorage for dismissed prompts
  const dismissed = localStorage.getItem('pwa-install-dismissed')
  const dismissedTime = dismissed ? parseInt(dismissed) : 0
  const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
  
  // Show again after 7 days
  if (dismissed && daysSinceDismissed < 7) return false
  
  // Show for all platforms
  return true
}

// Handle beforeinstallprompt event (Android/Desktop)
const handleBeforeInstallPrompt = (e) => {
  console.log('[PWA] beforeinstallprompt event fired')
  
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()
  
  // Save the event so it can be triggered later
  deferredPrompt.value = e
  
  if (shouldShowInstallPrompt()) {
    showInstallPrompt.value = true
  }
}

// Handle app installed event
const handleAppInstalled = () => {
  console.log('[PWA] App was installed')
  showInstallPrompt.value = false
  isInstalled.value = true
  
  // Track installation
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install', {
      event_category: 'PWA',
      event_label: 'App Installed'
    })
  }
}

// Handle install button click
const handleInstall = async () => {
  if (isIOS.value) {
    // Show iOS instructions
    showIOSInstructions.value = true
    showInstallPrompt.value = false
    
    // Track iOS install instructions shown
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_ios_instructions', {
        event_category: 'PWA',
        event_label: 'iOS Instructions Shown'
      })
    }
  } else if (deferredPrompt.value) {
    // Show the install prompt for Android/Desktop
    const { outcome } = await deferredPrompt.value.prompt()
    console.log(`[PWA] User response to the install prompt: ${outcome}`)
    
    // Track install prompt outcome
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install_prompt', {
        event_category: 'PWA',
        event_label: outcome
      })
    }
    
    if (outcome === 'accepted') {
      showInstallPrompt.value = false
    }
    
    deferredPrompt.value = null
  }
}

// Dismiss install prompt
const dismissInstallPrompt = () => {
  showInstallPrompt.value = false
  localStorage.setItem('pwa-install-dismissed', Date.now().toString())
}

// Close iOS instructions
const closeIOSInstructions = () => {
  showIOSInstructions.value = false
}

// Service worker update handling
const handleServiceWorkerUpdate = () => {
  console.log('[PWA] Service worker update available')
  updateAvailable.value = true
}

// Update app
const updateApp = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      }
    })
  }
  updateAvailable.value = false
}

// Dismiss update notification
const dismissUpdate = () => {
  updateAvailable.value = false
}

// Initialize PWA features
onMounted(() => {
  detectPlatform()
  
  // Add event listeners
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.addEventListener('appinstalled', handleAppInstalled)
  
  // Show install prompt for iOS users specifically
  if (isIOS.value && shouldShowInstallPrompt()) {
    setTimeout(() => {
      showInstallPrompt.value = true
    }, 3000) // Show after 3 seconds on iOS
  }
  
  // Register service worker update listener
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
    
    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              handleServiceWorkerUpdate()
            }
          })
        }
      })
    })
  }
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})
</script>
