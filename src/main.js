import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './style.css'

// PWA Registration
import { registerSW } from 'virtual:pwa-register'

// Toast configuration
const toastOptions = {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

// Create Vue app
const app = createApp(App)
const pinia = createPinia()

// Install plugins
app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

// Initialize auth store
import { useAuthStore } from '@/stores/auth'

// Initialize the app
async function initializeApp() {
  try {
    // Initialize auth store
    const authStore = useAuthStore()
    await authStore.initialize()
    
    console.log('Auth store initialized successfully')
  } catch (error) {
    console.error('Failed to initialize auth store:', error)
  } finally {
    // Mount app regardless of auth initialization result
    app.mount('#app')
  }
}

// Initialize the application
initializeApp()

// Register Service Worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, please refresh.')
    // You can show a toast or modal here to inform user about update
  },
  onOfflineReady() {
    console.log('App ready to work offline.')
  },
})

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
  // You can send error to logging service here
}
