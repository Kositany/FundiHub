<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <router-link to="/" class="inline-block">
          <img src="/logo.svg" alt="FundiHub" class="h-12 w-auto mx-auto" />
        </router-link>
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join FundiHub and start connecting with trusted fundis
        </p>
      </div>

      <!-- User Type Selection -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 text-center">
          How will you use FundiHub?
        </h3>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="type in userTypes"
            :key="type.value"
            @click="form.userType = type.value"
            :class="[
              'p-4 rounded-lg border-2 transition-all text-center',
              form.userType === type.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
            ]"
          >
            <component :is="type.icon" class="w-6 h-6 mx-auto mb-2" />
            <div class="text-sm font-medium">{{ type.label }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ type.description }}</div>
          </button>
        </div>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ form.userType === 'business' ? 'Contact Person Name' : 'Full Name' }}
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              autocomplete="name"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
              placeholder="Enter your full name"
              :class="{ 'border-red-500 dark:border-red-400': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.name }}
            </p>
          </div>

          <!-- Business Name (if business type) -->
          <div v-if="form.userType === 'business'">
            <label for="businessName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Name
            </label>
            <input
              id="businessName"
              v-model="form.businessName"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
              placeholder="Enter your business name"
            />
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
              placeholder="Enter your email"
              :class="{ 'border-red-500 dark:border-red-400': errors.email }"
            />
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
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="new-password"
                class="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                placeholder="Create a password"
                :class="{ 'border-red-500 dark:border-red-400': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <!-- Password Strength Indicator -->
            <div class="mt-2">
              <div class="flex space-x-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  :class="[
                    'h-1 flex-1 rounded',
                    passwordStrength >= i ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
                  ]"
                ></div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ passwordStrengthText }}
              </p>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              autocomplete="new-password"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
              placeholder="Confirm your password"
              :class="{ 'border-red-500 dark:border-red-400': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <input
              id="terms"
              v-model="form.terms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded mt-0.5"
            />
            <label for="terms" class="ml-3 text-sm text-gray-700 dark:text-gray-300">
              I agree to the
              <a href="#" class="text-primary hover:text-primary-dark">Terms of Service</a>
              and
              <a href="#" class="text-primary hover:text-primary-dark">Privacy Policy</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !form.terms"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            <LoadingSpinner v-if="loading" class="w-5 h-5 mr-2" />
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>

          <!-- Test Simple Auth Button (Development) -->
          <div v-if="isDev" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <p class="text-xs text-gray-500 mb-2">Development Testing:</p>
            <div class="space-y-2">
              <button
                type="button"
                @click="testSimpleAuth"
                :disabled="loading || !form.email || !form.password"
                class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {{ loading ? 'Testing...' : 'Test Simple Auth (No Database)' }}
              </button>
              
              <button
                type="button"
                @click="testDirectAppwrite"
                :disabled="loading || !form.email || !form.password"
                class="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {{ loading ? 'Testing...' : 'Test Direct Appwrite Connection' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Sign In Link -->
        <div class="text-center space-y-2">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <router-link to="/login" class="font-medium text-primary hover:text-primary-dark transition-colors">
              Sign in here
            </router-link>
          </p>
          
          <!-- Debug Link (Development only) -->
          <div v-if="isDev" class="text-xs text-gray-500">
            Having connection issues?
            <router-link to="/test-connectivity" class="text-primary hover:text-primary-dark">
              Run connectivity test
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { EyeIcon, EyeSlashIcon, UserIcon, WrenchScrewdriverIcon, BuildingOfficeIcon } from '@heroicons/vue/24/outline'
import { simpleRegister } from '@/utils/simple-auth'
import { testDirectRegistration, testProjectConfig } from '@/utils/direct-appwrite-test'

// Components
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

// Composables
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// State
const loading = ref(false)
const showPassword = ref(false)
const isDev = import.meta.env.DEV

const userTypes = [
  {
    value: 'user',
    label: 'User',
    description: 'Find fundis',
    icon: UserIcon
  },
  {
    value: 'fundi',
    label: 'Fundi',
    description: 'Offer services',
    icon: WrenchScrewdriverIcon
  },
  {
    value: 'business',
    label: 'Business',
    description: 'Hire teams',
    icon: BuildingOfficeIcon
  }
]

const form = reactive({
  userType: 'user',
  name: '',
  businessName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Password strength calculation
const passwordStrength = computed(() => {
  if (!form.password) return 0
  
  let strength = 0
  if (form.password.length >= 8) strength++
  if (/[a-z]/.test(form.password)) strength++
  if (/[A-Z]/.test(form.password)) strength++
  if (/[0-9]/.test(form.password)) strength++
  if (/[^A-Za-z0-9]/.test(form.password)) strength++
  
  return Math.min(strength, 4)
})

const passwordStrengthText = computed(() => {
  const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  return texts[passwordStrength.value] || 'Very Weak'
})

// Methods
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  // Name validation
  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }
  
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
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  }
  
  // Confirm password validation
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    await authStore.register(
      form.email,
      form.password,
      form.name,
      form.userType
    )
    
    toast.success('Account created successfully! Welcome to FundiHub.')
    
    // Redirect to onboarding
    router.push(`/onboarding/${form.userType}`)
  } catch (error) {
    toast.error(error.message || 'Failed to create account. Please try again.')
  } finally {
    loading.value = false
  }
}

const testSimpleAuth = async () => {
  if (!form.email || !form.password) {
    toast.error('Please enter email and password')
    return
  }

  loading.value = true
  
  try {
    const result = await simpleRegister(form.email, form.password, form.name || 'Test User')
    
    if (result.success) {
      toast.success('✅ Simple registration successful! (Account created without database)')
      console.log('Registration result:', result.user)
      
      // For testing, just show success - don't redirect
      toast.info('Check the browser console for details')
    }
  } catch (error) {
    toast.error(`Simple registration failed: ${error.message}`)
    console.error('Simple registration error:', error)
  } finally {
    loading.value = false
  }
}

const testDirectAppwrite = async () => {
  if (!form.email || !form.password) {
    toast.error('Please enter email and password')
    return
  }

  loading.value = true
  
  try {
    // First test project config
    toast.info('Testing project configuration...')
    const projectTest = await testProjectConfig()
    
    if (!projectTest.success) {
      toast.error(`Project test failed: ${projectTest.error}`)
      console.error('Project test failed:', projectTest)
      return
    }
    
    toast.success('✅ Project configuration is valid')
    
    // Now test direct registration
    toast.info('Testing direct account creation...')
    const result = await testDirectRegistration(form.email, form.password, form.name || 'Test User')
    
    if (result.success) {
      toast.success('✅ Direct Appwrite registration successful!')
      console.log('Direct registration result:', result.result)
      toast.info('Account created successfully! Check console for details.')
    } else {
      toast.error(`Direct registration failed: ${result.analysis}`)
      console.error('Direct registration failed:', result)
      
      // Show detailed error info
      toast.info(`Error Code: ${result.code} - ${result.error}`)
    }
  } catch (error) {
    toast.error(`Test failed: ${error.message}`)
    console.error('Direct Appwrite test error:', error)
  } finally {
    loading.value = false
  }
}
</script>
