<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-primary/10 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-4xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <WrenchScrewdriverIcon class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
          Welcome to FundiHub, {{ authStore.user?.name }}!
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Let's set up your professional fundi profile to connect you with customers looking for your expertise
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-12">
        <div class="flex items-center justify-between max-w-2xl mx-auto">
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
                  ? 'bg-gradient-to-r from-primary to-red-600 text-white border-primary shadow-lg scale-110'
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
                currentStep > index + 1 ? 'bg-gradient-to-r from-primary to-red-600' : 'bg-gray-200 dark:bg-gray-700'
              ]"
            ></div>
          </div>
        </div>
        <div class="flex justify-between mt-4 max-w-2xl mx-auto">
          <span
            v-for="(step, index) in steps"
            :key="step.id"
            :class="[
              'text-sm font-medium transition-colors duration-300',
              currentStep >= index + 1 ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
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
                What type of fundi professional are you?
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                This helps us customize your profile and connect you with the right opportunities
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                v-for="type in fundiTypes"
                :key="type.value"
                @click="form.organizationType = type.value"
                :class="[
                  'p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105',
                  form.organizationType === type.value
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-red-500/10 shadow-xl scale-105'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary/50 bg-white/50 dark:bg-gray-700/50'
                ]"
              >
                <div class="flex items-start space-x-4">
                  <div :class="[
                    'p-3 rounded-xl transition-colors duration-300',
                    form.organizationType === type.value ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
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

            <!-- Organization Details -->
            <div v-if="form.organizationType === 'organization'" class="mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl space-y-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Organization Details</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization Name *
                  </label>
                  <input
                    v-model="form.organizationName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="Enter your organization name"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Team Size *
                  </label>
                  <select
                    v-model="form.teamSize"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                  >
                    <option value="">Select team size</option>
                    <option value="2-5">2-5 people</option>
                    <option value="6-10">6-10 people</option>
                    <option value="11-20">11-20 people</option>
                    <option value="20+">20+ people</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Registration Number (Optional)
                </label>
                <input
                  v-model="form.registrationNumber"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                  placeholder="Enter registration number for verification"
                />
              </div>
            </div>
          </div>

          <!-- Step 2: Skills & Experience -->
          <div v-if="currentStep === 2" class="space-y-8">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Tell us about your expertise
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                This information helps customers find and trust your services
              </p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Specialization *
                  </label>
                  <select
                    v-model="form.specialization"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                  >
                    <option value="">Select your main specialization</option>
                    <option v-for="spec in specializations" :key="spec.value" :value="spec.value">
                      {{ spec.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    v-model="form.experience"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                  >
                    <option value="">Select experience level</option>
                    <option value="1">Less than 1 year</option>
                    <option value="2">1-2 years</option>
                    <option value="5">3-5 years</option>
                    <option value="10">6-10 years</option>
                    <option value="15">More than 10 years</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Certifications & Licenses (Optional)
                  </label>
                  <textarea
                    v-model="form.certifications"
                    rows="3"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="List your relevant certifications, licenses, or qualifications"
                  ></textarea>
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Additional Skills & Services
                  </label>
                  <div class="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    <label
                      v-for="skill in availableSkills"
                      :key="skill"
                      class="flex items-center space-x-3 p-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        :value="skill"
                        v-model="form.skills"
                        class="text-primary focus:ring-primary rounded"
                      />
                      <span class="text-sm text-gray-700 dark:text-gray-300">{{ skill }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Location & Pricing -->
          <div v-if="currentStep === 3" class="space-y-8">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Service area and pricing
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Let customers know where you operate and your rates
              </p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Service Location *
                  </label>
                  <input
                    v-model="form.location"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="e.g., Nairobi, Westlands"
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Main area where you provide services
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Radius
                  </label>
                  <select
                    v-model="form.serviceRadius"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                  >
                    <option value="5">Within 5km</option>
                    <option value="10">Within 10km</option>
                    <option value="25">Within 25km</option>
                    <option value="50">Within 50km</option>
                    <option value="anywhere">Anywhere in the city</option>
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
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="e.g., +254712345678"
                  />
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hourly Rate (KSH) *
                  </label>
                  <input
                    v-model="form.hourlyRate"
                    type="number"
                    min="100"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="e.g., 1500"
                  />
                  <div class="mt-2 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <InformationCircleIcon class="w-4 h-4" />
                    <span>Average rates in your area: KSH 800 - 2500/hour</span>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Job Duration
                  </label>
                  <select
                    v-model="form.minimumDuration"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="4">Half day (4 hours)</option>
                    <option value="8">Full day (8 hours)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Days
                  </label>
                  <div class="grid grid-cols-2 gap-2">
                    <label
                      v-for="day in weekDays"
                      :key="day"
                      class="flex items-center space-x-2 p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        :value="day"
                        v-model="form.availableDays"
                        class="text-primary focus:ring-primary rounded"
                      />
                      <span class="text-sm text-gray-700 dark:text-gray-300">{{ day }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Description *
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white transition-all"
                placeholder="Describe your services, approach, and what makes you unique. This will be visible to potential customers..."
              ></textarea>
              <div class="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Make it compelling and professional</span>
                <span>{{ form.description.length }}/500</span>
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
              class="flex items-center px-8 py-3 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl hover:from-primary-dark hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Next
              <ArrowRightIcon class="w-5 h-5 ml-2" />
            </button>
            <button
              v-else
              type="submit"
              :disabled="loading"
              class="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
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
  WrenchScrewdriverIcon, 
  UserIcon, 
  BuildingOfficeIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const loading = ref(false)
const currentStep = ref(1)

const steps = [
  { id: 1, label: 'Profile Type' },
  { id: 2, label: 'Skills & Experience' },
  { id: 3, label: 'Location & Pricing' }
]

const fundiTypes = [
  {
    value: 'individual',
    label: 'Individual Fundi',
    description: 'Working independently to provide personalized services directly to customers',
    features: ['Personal branding', 'Direct customer contact', 'Flexible scheduling'],
    icon: UserIcon
  },
  {
    value: 'organization',
    label: 'Organization/Team',
    description: 'Leading a team of professionals to handle larger projects and multiple clients',
    features: ['Team management', 'Large projects', 'Business registration'],
    icon: BuildingOfficeIcon
  }
]

const specializations = [
  { value: 'electrician', label: 'Electrician' },
  { value: 'plumber', label: 'Plumber' },
  { value: 'carpenter', label: 'Carpenter' },
  { value: 'painter', label: 'Painter' },
  { value: 'cleaner', label: 'Cleaner' },
  { value: 'gardener', label: 'Gardener' },
  { value: 'mechanic', label: 'Mechanic' },
  { value: 'welder', label: 'Welder' },
  { value: 'mason', label: 'Mason' },
  { value: 'roofing', label: 'Roofing Specialist' },
  { value: 'hvac', label: 'HVAC Technician' },
  { value: 'security', label: 'Security Services' },
  { value: 'appliance-repair', label: 'Appliance Repair' },
  { value: 'solar', label: 'Solar Installation' },
  { value: 'tiling', label: 'Tiling & Flooring' }
]

const availableSkills = [
  'Emergency Services', 'Weekend Work', 'Insurance Claims', 'Free Estimates',
  'Licensed & Insured', 'Quality Guarantee', 'Follow-up Service', 'Bulk Discounts',
  'Same Day Service', '24/7 Available', 'Free Consultation', 'Material Supply',
  'Warranty Provided', 'Clean-up Included', 'Project Management', 'Design Services'
]

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const form = reactive({
  organizationType: 'individual',
  organizationName: '',
  teamSize: '',
  registrationNumber: '',
  specialization: '',
  experience: '',
  skills: [],
  certifications: '',
  location: '',
  serviceRadius: '10',
  phone: '',
  hourlyRate: '',
  minimumDuration: '2',
  availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  description: ''
})

const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++
  }
}

const validateCurrentStep = () => {
  if (currentStep.value === 1) {
    if (!form.organizationType) {
      toast.error('Please select your profile type')
      return false
    }
    if (form.organizationType === 'organization' && (!form.organizationName || !form.teamSize)) {
      toast.error('Please fill in organization details')
      return false
    }
  }
  if (currentStep.value === 2) {
    if (!form.specialization || !form.experience) {
      toast.error('Please complete all required fields')
      return false
    }
  }
  if (currentStep.value === 3) {
    if (!form.location || !form.phone || !form.hourlyRate || !form.description) {
      toast.error('Please complete all required fields')
      return false
    }
    if (form.description.length < 50) {
      toast.error('Please provide a more detailed service description (at least 50 characters)')
      return false
    }
  }
  return true
}

const handleSubmit = async () => {
  if (!validateCurrentStep()) return
  
  loading.value = true
  
  try {
    await authStore.completeOnboarding({
      userType: 'fundi',
      ...form
    })
    
    toast.success('Your fundi profile has been created successfully! Welcome to FundiHub.')
    router.push('/dashboard/fundi')
  } catch (error) {
    toast.error(error.message || 'Failed to complete onboarding')
  } finally {
    loading.value = false
  }
}
</script>
