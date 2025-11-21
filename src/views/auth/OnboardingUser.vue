<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-500/10 to-green-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-3xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <UserIcon class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
          Welcome to FundiHub, {{ authStore.user?.name }}!
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Let's personalize your experience to help you find the perfect fundi for your needs
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-12">
        <div class="flex items-center justify-between max-w-lg mx-auto">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            class="flex items-center"
            :class="{ 'flex-1': index < steps.length - 1 }"
          >
            <div
              :class="[
                'w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300',
                currentStep >= index + 1
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-lg scale-110'
                  : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600'
              ]"
            >
              <CheckIcon v-if="currentStep > index + 1" class="w-6 h-6" />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div
              v-if="index < steps.length - 1"
              :class="[
                'flex-1 h-1 mx-4 rounded transition-all duration-300',
                currentStep > index + 1 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
              ]"
            ></div>
          </div>
        </div>
        <div class="flex justify-between mt-4 max-w-lg mx-auto">
          <span
            v-for="(step, index) in steps"
            :key="step.id"
            :class="[
              'text-sm font-medium transition-colors duration-300',
              currentStep >= index + 1 ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'
            ]"
          >
            {{ step.label }}
          </span>
        </div>
      </div>

      <!-- Form Card -->
      <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 lg:p-12">
        <form @submit.prevent="handleSubmit">
          <!-- Step 1: Profile Type -->
          <div v-if="currentStep === 1" class="space-y-8">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How will you be using FundiHub?
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                This helps us customize your experience and show you the most relevant services
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                v-for="type in userTypes"
                :key="type.value"
                @click="form.userType = type.value"
                :class="[
                  'p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105',
                  form.userType === type.value
                    ? 'border-green-500 bg-gradient-to-br from-green-500/10 to-emerald-500/10 shadow-xl scale-105'
                    : 'border-gray-300 dark:border-gray-600 hover:border-green-500/50 bg-white/50 dark:bg-gray-700/50'
                ]"
              >
                <div class="flex items-start space-x-4">
                  <div :class="[
                    'p-3 rounded-xl transition-colors duration-300',
                    form.userType === type.value ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                  ]">
                    <component :is="type.icon" class="w-8 h-8" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ type.label }}</h4>
                    <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ type.description }}</p>
                    <div class="mt-3 flex flex-wrap gap-2">
                      <span
                        v-for="feature in type.features"
                        :key="feature"
                        class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                      >
                        {{ feature }}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <!-- Business Details -->
            <div v-if="form.userType === 'business'" class="mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl space-y-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Business Information</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    v-model="form.companyName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Industry *
                  </label>
                  <select
                    v-model="form.industry"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white transition-all"
                  >
                    <option value="">Select your industry</option>
                    <option value="construction">Construction</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="technology">Technology</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Size
                  </label>
                  <select
                    v-model="form.companySize"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white transition-all"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Service Budget (KSH)
                  </label>
                  <select
                    v-model="form.monthlyBudget"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white transition-all"
                  >
                    <option value="10000-50000">10,000 - 50,000</option>
                    <option value="50000-100000">50,000 - 100,000</option>
                    <option value="100000-500000">100,000 - 500,000</option>
                    <option value="500000+">500,000+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Location & Preferences -->
          <div v-if="currentStep === 2" class="space-y-8">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Where are you located?
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                This helps us show you fundis in your area and relevant service options
              </p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Location *
                  </label>
                  <input
                    v-model="form.location"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="e.g., Nairobi, Westlands"
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Main area where you'll need services
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Property Type
                  </label>
                  <select
                    v-model="form.propertyType"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white transition-all"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="office">Office</option>
                    <option value="shop">Shop/Store</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="multiple">Multiple Properties</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="e.g., +254712345678"
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    For fundis to contact you about bookings
                  </p>
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Contact Method
                  </label>
                  <div class="space-y-3">
                    <label
                      v-for="method in contactMethods"
                      :key="method.value"
                      class="flex items-center space-x-3 p-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        :value="method.value"
                        v-model="form.preferredContact"
                        class="text-green-500 focus:ring-green-500"
                      />
                      <div class="flex items-center space-x-2">
                        <component :is="method.icon" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span class="text-sm text-gray-700 dark:text-gray-300">{{ method.label }}</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Service Time
                  </label>
                  <div class="grid grid-cols-2 gap-3">
                    <label
                      v-for="time in serviceTimes"
                      :key="time"
                      class="flex items-center space-x-2 p-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        :value="time"
                        v-model="form.preferredTimes"
                        class="text-green-500 focus:ring-green-500 rounded"
                      />
                      <span class="text-sm text-gray-700 dark:text-gray-300">{{ time }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Service Interests -->
          <div v-if="currentStep === 3" class="space-y-8">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What services are you interested in?
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Select the types of services you're most likely to need. This helps us recommend the best fundis for you.
              </p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <label
                v-for="service in serviceTypes"
                :key="service.value"
                :class="[
                  'flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105',
                  form.interestedServices.includes(service.value)
                    ? 'border-green-500 bg-gradient-to-br from-green-500/10 to-emerald-500/10 shadow-lg scale-105'
                    : 'border-gray-300 dark:border-gray-600 hover:border-green-500/50 bg-white/50 dark:bg-gray-700/50'
                ]"
              >
                <input
                  type="checkbox"
                  :value="service.value"
                  v-model="form.interestedServices"
                  class="sr-only"
                />
                <div :class="[
                  'p-3 rounded-xl mb-3 transition-colors duration-300',
                  form.interestedServices.includes(service.value) 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                ]">
                  <component :is="service.icon" class="w-6 h-6" />
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {{ service.label }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                  {{ service.description }}
                </span>
              </label>
            </div>

            <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tell us more about your needs (Optional)
              </label>
              <textarea
                v-model="form.additionalInfo"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white transition-all"
                placeholder="Any specific requirements, preferences, or details about the services you need..."
              ></textarea>
              <div class="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Help us match you with the perfect fundi</span>
                <span>{{ form.additionalInfo.length }}/300</span>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="currentStep--"
              class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeftIcon class="w-5 h-5 mr-2" />
              Previous
            </button>
            <div v-else></div>
            
            <button
              v-if="currentStep < 3"
              type="button"
              @click="nextStep"
              class="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Next
              <ArrowRightIcon class="w-5 h-5 ml-2" />
            </button>
            <button
              v-else
              type="submit"
              :disabled="loading"
              class="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <LoadingSpinner v-if="loading" class="w-5 h-5 mr-2" />
              <span v-if="!loading">Complete Setup</span>
              <span v-else>Setting up...</span>
              <CheckIcon v-if="!loading" class="w-5 h-5 ml-2" />
            </button>
          </div>
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
import { 
  UserIcon, 
  BuildingOfficeIcon,
  HomeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  PaintBrushIcon,
  ScissorsIcon,
  SparklesIcon,
  TruckIcon,
  ShieldCheckIcon,
  CogIcon
} from '@heroicons/vue/24/outline'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const loading = ref(false)
const currentStep = ref(1)

const steps = [
  { id: 1, label: 'Profile Type' },
  { id: 2, label: 'Location' },
  { id: 3, label: 'Interests' }
]

const userTypes = [
  {
    value: 'individual',
    label: 'Individual User',
    description: 'Personal use for home, family, and individual needs',
    features: ['Home services', 'Personal projects', 'Family needs'],
    icon: UserIcon
  },
  {
    value: 'business',
    label: 'Business/Corporate',
    description: 'Business entity requiring professional services for commercial operations',
    features: ['Commercial services', 'Bulk bookings', 'Priority support'],
    icon: BuildingOfficeIcon
  }
]

const contactMethods = [
  { value: 'phone', label: 'Phone Call', icon: PhoneIcon },
  { value: 'whatsapp', label: 'WhatsApp', icon: ChatBubbleLeftRightIcon },
  { value: 'sms', label: 'SMS', icon: ChatBubbleLeftRightIcon },
  { value: 'email', label: 'Email', icon: EnvelopeIcon }
]

const serviceTimes = ['Morning', 'Afternoon', 'Evening', 'Weekend', 'Emergency', 'Flexible']

const serviceTypes = [
  { value: 'electrician', label: 'Electrical', description: 'Wiring, repairs', icon: BoltIcon },
  { value: 'plumber', label: 'Plumbing', description: 'Pipes, fixtures', icon: WrenchScrewdriverIcon },
  { value: 'carpenter', label: 'Carpentry', description: 'Wood work', icon: CogIcon },
  { value: 'painter', label: 'Painting', description: 'Interior, exterior', icon: PaintBrushIcon },
  { value: 'cleaner', label: 'Cleaning', description: 'House, office', icon: SparklesIcon },
  { value: 'gardener', label: 'Gardening', description: 'Lawn, plants', icon: ScissorsIcon },
  { value: 'mechanic', label: 'Automotive', description: 'Car repairs', icon: TruckIcon },
  { value: 'security', label: 'Security', description: 'Safety systems', icon: ShieldCheckIcon }
]

const form = reactive({
  userType: 'individual',
  companyName: '',
  industry: '',
  companySize: '1-10',
  monthlyBudget: '10000-50000',
  location: '',
  propertyType: 'apartment',
  phone: '',
  preferredContact: 'phone',
  preferredTimes: ['Morning', 'Afternoon'],
  interestedServices: [],
  additionalInfo: ''
})

const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++
  }
}

const validateCurrentStep = () => {
  if (currentStep.value === 1) {
    if (!form.userType) {
      toast.error('Please select your profile type')
      return false
    }
    if (form.userType === 'business' && (!form.companyName || !form.industry)) {
      toast.error('Please fill in business details')
      return false
    }
  }
  if (currentStep.value === 2) {
    if (!form.location || !form.phone) {
      toast.error('Please complete location and contact information')
      return false
    }
  }
  if (currentStep.value === 3) {
    if (form.interestedServices.length === 0) {
      toast.error('Please select at least one service you\'re interested in')
      return false
    }
  }
  return true
}

const handleSubmit = async () => {
  if (!validateCurrentStep()) return
  
  loading.value = true
  
  try {
    console.log('🚀 Starting user onboarding submission...')
    console.log('📝 Form data:', form)
    
    const onboardingData = {
      userType: 'user',
      ...form
    }
    
    console.log('📤 Sending onboarding data:', onboardingData)
    
    await authStore.completeOnboarding(onboardingData)
    
    console.log('✅ Onboarding completed successfully!')
    toast.success('Welcome to FundiHub! Your profile has been set up successfully.')
    
    console.log('🔄 Navigating to user dashboard...')
    await router.push('/dashboard/user')
    
    console.log('✅ Navigation completed!')
  } catch (error) {
    console.error('❌ Onboarding submission error:', error)
    
    // Show more detailed error information
    const errorMessage = error.message || 'Failed to complete onboarding'
    console.error('Error message for user:', errorMessage)
    
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}
</script>
