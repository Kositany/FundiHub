<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-2xl font-bold leading-6 text-gray-900 dark:text-white mb-6">
                <div class="flex items-center justify-between">
                  <span>Customize Your Profile</span>
                  <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <XMarkIcon class="h-6 w-6" />
                  </button>
                </div>
              </DialogTitle>

              <div class="max-h-[80vh] overflow-y-auto">
                <!-- Profile Tabs -->
                <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
                  <nav class="-mb-px flex space-x-8">
                    <button
                      v-for="tab in tabs"
                      :key="tab.id"
                      @click="activeTab = tab.id"
                      :class="[
                        'py-2 px-1 border-b-2 font-medium text-sm',
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      ]"
                    >
                      <component :is="tab.icon" class="h-5 w-5 mr-2 inline" />
                      {{ tab.name }}
                    </button>
                  </nav>
                </div>

                <!-- Basic Information Tab -->
                <div v-show="activeTab === 'basic'" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Profile Photo -->
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Profile Photo
                      </label>
                      <div class="flex items-center space-x-6">
                        <div class="relative">
                          <img
                            :src="form.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=3b82f6&color=fff&size=128`"
                            :alt="form.name"
                            class="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <label class="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary-dark transition-colors">
                            <CameraIcon class="h-4 w-4" />
                            <input type="file" class="hidden" @change="handleAvatarUpload" accept="image/*" />
                          </label>
                        </div>
                        <div>
                          <button
                            type="button"
                            @click="removeAvatar"
                            class="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
                          >
                            Remove photo
                          </button>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            JPG, PNG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Name -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        v-model="form.name"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <!-- Email -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        v-model="form.email"
                        type="email"
                        disabled
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
                      />
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Email cannot be changed
                      </p>
                    </div>

                    <!-- Phone -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        v-model="form.phone"
                        type="tel"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="+254 700 000 000"
                      />
                    </div>

                    <!-- Location -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <input
                        v-model="form.location"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="City, County"
                      />
                    </div>

                    <!-- Bio -->
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        v-model="form.bio"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Professional Info Tab (Fundi-specific) -->
                <div v-show="activeTab === 'professional' && userType === 'fundi'" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Specialization -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Primary Specialization
                      </label>
                      <select
                        v-model="form.specialization"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Select specialization</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                        <option value="carpenter">Carpenter</option>
                        <option value="mason">Mason</option>
                        <option value="painter">Painter</option>
                        <option value="mechanic">Mechanic</option>
                        <option value="cleaner">Cleaner</option>
                        <option value="gardener">Gardener</option>
                        <option value="security">Security</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <!-- Experience -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Years of Experience
                      </label>
                      <input
                        v-model.number="form.experience"
                        type="number"
                        min="0"
                        max="50"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="0"
                      />
                    </div>

                    <!-- Hourly Rate -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hourly Rate (KSH)
                      </label>
                      <input
                        v-model.number="form.hourlyRate"
                        type="number"
                        min="0"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="500"
                      />
                    </div>

                    <!-- Organization Type -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Organization Type
                      </label>
                      <select
                        v-model="form.organizationType"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="individual">Individual</option>
                        <option value="team">Team/Organization</option>
                      </select>
                    </div>

                    <!-- Skills -->
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Skills & Services
                      </label>
                      <div class="flex flex-wrap gap-2 mb-3">
                        <span
                          v-for="skill in form.skills"
                          :key="skill"
                          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                        >
                          {{ skill }}
                          <button @click="removeSkill(skill)" class="ml-2 text-primary/60 hover:text-primary">
                            <XMarkIcon class="h-4 w-4" />
                          </button>
                        </span>
                      </div>
                      <div class="flex space-x-2">
                        <input
                          v-model="newSkill"
                          @keyup.enter="addSkill"
                          type="text"
                          class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Add a skill..."
                        />
                        <button
                          @click="addSkill"
                          type="button"
                          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <!-- Description -->
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Professional Description
                      </label>
                      <textarea
                        v-model="form.description"
                        rows="4"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Describe your professional experience and expertise..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Business Info Tab (Business-specific) -->
                <div v-show="activeTab === 'business' && userType === 'business'" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Business Name -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Name
                      </label>
                      <input
                        v-model="form.businessName"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Your Company Name"
                      />
                    </div>

                    <!-- Business Type -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Type
                      </label>
                      <select
                        v-model="form.businessType"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Select business type</option>
                        <option value="construction">Construction</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="retail">Retail</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <!-- Industry -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Industry
                      </label>
                      <input
                        v-model="form.industry"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="e.g., Real Estate, Manufacturing"
                      />
                    </div>

                    <!-- Company Size -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company Size
                      </label>
                      <select
                        v-model="form.size"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>

                    <!-- Website -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Website
                      </label>
                      <input
                        v-model="form.website"
                        type="url"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <!-- Registration Number -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Registration Number
                      </label>
                      <input
                        v-model="form.registrationNumber"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Business registration number"
                      />
                    </div>

                    <!-- Business Description -->
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Description
                      </label>
                      <textarea
                        v-model="form.description"
                        rows="4"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Describe your business and what services you need..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Preferences Tab -->
                <div v-show="activeTab === 'preferences'" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Notification Preferences -->
                    <div class="md:col-span-2">
                      <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Notification Preferences
                      </h4>
                      <div class="space-y-4">
                        <div class="flex items-center justify-between">
                          <div>
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email Notifications
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              Receive updates about bookings and messages
                            </p>
                          </div>
                          <ToggleSwitch v-model="form.preferences.emailNotifications" />
                        </div>
                        
                        <div class="flex items-center justify-between">
                          <div>
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                              SMS Notifications
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              Get text messages for urgent updates
                            </p>
                          </div>
                          <ToggleSwitch v-model="form.preferences.smsNotifications" />
                        </div>
                        
                        <div class="flex items-center justify-between">
                          <div>
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Marketing Communications
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              Receive promotional offers and updates
                            </p>
                          </div>
                          <ToggleSwitch v-model="form.preferences.marketingEmails" />
                        </div>
                      </div>
                    </div>

                    <!-- Privacy Settings -->
                    <div class="md:col-span-2">
                      <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Privacy Settings
                      </h4>
                      <div class="space-y-4">
                        <div class="flex items-center justify-between">
                          <div>
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Profile Visibility
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              Make your profile visible to other users
                            </p>
                          </div>
                          <ToggleSwitch v-model="form.preferences.profileVisible" />
                        </div>
                        
                        <div class="flex items-center justify-between">
                          <div>
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Show Contact Information
                            </label>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              Display your phone number on your profile
                            </p>
                          </div>
                          <ToggleSwitch v-model="form.preferences.showContact" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  @click="closeModal"
                  class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  @click="saveProfile"
                  :disabled="saving"
                  class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-400 transition-colors"
                >
                  {{ saving ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  XMarkIcon,
  UserIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CogIcon,
  CameraIcon,
} from '@heroicons/vue/24/outline'
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// Composables
const authStore = useAuthStore()
const toast = useToast()

// State
const activeTab = ref('basic')
const saving = ref(false)
const newSkill = ref('')

// Computed
const userType = computed(() => authStore.user?.userType || 'user')

const tabs = computed(() => {
  const baseTabs = [
    { id: 'basic', name: 'Basic Info', icon: UserIcon },
  ]
  
  if (userType.value === 'fundi') {
    baseTabs.push({ id: 'professional', name: 'Professional', icon: BriefcaseIcon })
  } else if (userType.value === 'business') {
    baseTabs.push({ id: 'business', name: 'Business Info', icon: BuildingOfficeIcon })
  }
  
  baseTabs.push({ id: 'preferences', name: 'Preferences', icon: CogIcon })
  
  return baseTabs
})

// Form data
const form = reactive({
  name: '',
  email: '',
  phone: '',
  location: '',
  bio: '',
  avatar: '',
  
  // Fundi-specific
  specialization: '',
  experience: 0,
  hourlyRate: 0,
  organizationType: 'individual',
  skills: [],
  description: '',
  
  // Business-specific
  businessName: '',
  businessType: '',
  industry: '',
  size: '',
  website: '',
  registrationNumber: '',
  
  // Preferences
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    profileVisible: true,
    showContact: true
  }
})

// Methods
const closeModal = () => {
  emit('close')
}

const initializeForm = () => {
  if (authStore.user) {
    form.name = authStore.user.name || ''
    form.email = authStore.user.email || ''
    form.phone = authStore.user.phone || ''
    form.location = authStore.user.location || ''
    form.bio = authStore.user.bio || ''
    form.avatar = authStore.user.avatar || ''
    
    // Initialize preferences with defaults
    form.preferences = {
      emailNotifications: authStore.user.preferences?.emailNotifications ?? true,
      smsNotifications: authStore.user.preferences?.smsNotifications ?? false,
      marketingEmails: authStore.user.preferences?.marketingEmails ?? false,
      profileVisible: authStore.user.preferences?.profileVisible ?? true,
      showContact: authStore.user.preferences?.showContact ?? true
    }
  }
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // In a real app, you'd upload to Appwrite storage
    // For now, we'll use a placeholder
    const reader = new FileReader()
    reader.onload = (e) => {
      form.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeAvatar = () => {
  form.avatar = ''
}

const addSkill = () => {
  if (newSkill.value.trim() && !form.skills.includes(newSkill.value.trim())) {
    form.skills.push(newSkill.value.trim())
    newSkill.value = ''
  }
}

const removeSkill = (skill) => {
  const index = form.skills.indexOf(skill)
  if (index > -1) {
    form.skills.splice(index, 1)
  }
}

const saveProfile = async () => {
  saving.value = true
  
  try {
    const updates = {
      name: form.name,
      phone: form.phone,
      location: form.location,
      bio: form.bio,
      avatar: form.avatar,
      preferences: form.preferences
    }
    
    // Add type-specific fields
    if (userType.value === 'fundi') {
      Object.assign(updates, {
        specialization: form.specialization,
        experience: form.experience,
        hourlyRate: form.hourlyRate,
        organizationType: form.organizationType,
        skills: form.skills,
        description: form.description
      })
    } else if (userType.value === 'business') {
      Object.assign(updates, {
        businessName: form.businessName,
        businessType: form.businessType,
        industry: form.industry,
        size: form.size,
        website: form.website,
        registrationNumber: form.registrationNumber,
        description: form.description
      })
    }
    
    await authStore.updateProfile(updates)
    toast.success('Profile updated successfully!')
    closeModal()
  } catch (error) {
    toast.error(error.message || 'Failed to update profile')
  } finally {
    saving.value = false
  }
}

// Watch for modal open to initialize form
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    initializeForm()
    activeTab.value = 'basic'
  }
})
</script>
