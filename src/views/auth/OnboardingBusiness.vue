<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <BuildingOfficeIcon class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to FundiHub!
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Let's set up your business profile to connect with professional fundis
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Name
            </label>
            <input
              v-model="form.businessName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="Enter your business name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Type
            </label>
            <select
              v-model="form.businessType"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select business type</option>
              <option value="construction">Construction</option>
              <option value="real-estate">Real Estate</option>
              <option value="hospitality">Hospitality</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="property-management">Property Management</option>
              <option value="facilities">Facilities Management</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Industry
            </label>
            <input
              v-model="form.industry"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Construction, Property Management"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Size
            </label>
            <select
              v-model="form.size"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Phone
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="e.g., +254712345678"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Location
            </label>
            <input
              v-model="form.location"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Nairobi, Industrial Area"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website (Optional)
            </label>
            <input
              v-model="form.website"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Registration Number (Optional)
            </label>
            <input
              v-model="form.registrationNumber"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="Business registration number"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Services You Need
            </label>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="service in services"
                :key="service"
                class="flex items-center space-x-2 p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="service"
                  v-model="form.neededServices"
                  class="text-primary focus:ring-primary"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ service }}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="Brief description of your business..."
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
          >
            {{ loading ? 'Setting up...' : 'Complete Setup' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { BuildingOfficeIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const loading = ref(false)

const services = [
  'Electrical', 'Plumbing', 'Carpentry', 'Painting',
  'Cleaning', 'Security', 'HVAC', 'Maintenance',
  'Landscaping', 'Construction', 'Renovation', 'Repairs'
]

const form = reactive({
  businessName: '',
  businessType: '',
  industry: '',
  size: '',
  phone: '',
  location: '',
  website: '',
  registrationNumber: '',
  neededServices: [],
  description: ''
})

const handleSubmit = async () => {
  loading.value = true
  
  try {
    await authStore.completeOnboarding({
      userType: 'business',
      ...form
    })
    
    toast.success('Your business profile has been set up successfully!')
    router.push('/dashboard/business')
  } catch (error) {
    toast.error(error.message || 'Failed to complete onboarding')
  } finally {
    loading.value = false
  }
}
</script>
