<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-primary/20 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-md w-full space-y-8 relative z-10">
      <!-- Header -->
      <div class="text-center">
        <router-link to="/" class="inline-block group">
          <div class="flex items-center justify-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-primary to-red-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">FundiHub</span>
          </div>
        </router-link>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Sign in to connect with trusted fundis or manage your services
        </p>
      </div>

      <!-- Login Form -->
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 space-y-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                class="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all backdrop-blur-sm"
                placeholder="Enter your email"
                :class="{ 'border-red-500 dark:border-red-400': errors.email }"
              />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="current-password"
                class="appearance-none relative block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white/50 dark:bg-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all backdrop-blur-sm"
                placeholder="Enter your password"
                :class="{ 'border-red-500 dark:border-red-400': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <button
              type="button"
              @click="showForgotPassword = true"
              class="text-sm text-primary hover:text-primary-dark transition-colors font-medium"
            >
              Forgot password?
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary to-red-600 hover:from-primary-dark hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
          >
            <LoadingSpinner v-if="loading" class="w-5 h-5 mr-2" />
            <span class="flex items-center">
              <ArrowRightOnRectangleIcon v-if="!loading" class="w-5 h-5 mr-2" />
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </span>
          </button>

          <!-- Social Login Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
            </div>
          </div>

          <!-- Social Login Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="loginWithGoogle"
              class="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all hover:scale-[1.02]"
            >
              <GoogleIcon class="w-5 h-5 mr-2" />
              Google
            </button>
            <button
              type="button"
              @click="loginWithApple"
              class="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all hover:scale-[1.02]"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
                <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z"/>
              </svg>
              Apple
            </button>
          </div>
        </form>

        <!-- Sign Up Link -->
        <div class="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <router-link to="/register" class="font-medium text-primary hover:text-primary-dark transition-colors">
              Create your account
            </router-link>
          </p>
        </div>
      </div>

      <!-- Quick Access Cards -->
      <div class="grid grid-cols-2 gap-4 mt-8">
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl p-4 text-center border border-white/20 dark:border-gray-700/20">
          <UserIcon class="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 class="font-medium text-gray-900 dark:text-white text-sm">Find Fundis</h3>
          <p class="text-xs text-gray-600 dark:text-gray-400">Connect with trusted professionals</p>
        </div>
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl p-4 text-center border border-white/20 dark:border-gray-700/20">
          <WrenchScrewdriverIcon class="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 class="font-medium text-gray-900 dark:text-white text-sm">Offer Services</h3>
          <p class="text-xs text-gray-600 dark:text-gray-400">Grow your business</p>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <ForgotPasswordModal
      v-if="showForgotPassword"
      @close="showForgotPassword = false"
      @submit="handleForgotPassword"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { 
  EyeIcon, 
  EyeSlashIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'

// Components
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ForgotPasswordModal from '@/components/auth/ForgotPasswordModal.vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'

// Composables
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// State
const loading = ref(false)
const showPassword = ref(false)
const showForgotPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const errors = reactive({
  email: '',
  password: ''
})

// Methods
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  // Email validation
  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  // Password validation
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    await authStore.login(form.email, form.password)
    
    toast.success('Welcome back! You have been successfully signed in.')
    
    // Redirect based on user type and onboarding status
    if (!authStore.isOnboardingComplete) {
      const userType = authStore.userType || 'user'
      router.push(`/onboarding/${userType}`)
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    toast.error(error.message || 'Failed to sign in. Please check your credentials and try again.')
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    toast.info('Google login integration coming soon!')
  } catch (error) {
    toast.error('Google login failed. Please try again.')
  }
}

const loginWithApple = async () => {
  try {
    toast.info('Apple login integration coming soon!')
  } catch (error) {
    toast.error('Apple login failed. Please try again.')
  }
}

const handleForgotPassword = async (email) => {
  try {
    await authStore.sendPasswordRecovery(email)
    toast.success('Password reset link sent to your email!')
    showForgotPassword.value = false
  } catch (error) {
    toast.error(error.message || 'Failed to send password reset email.')
  }
}
</script>
