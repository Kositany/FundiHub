<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-primary/10 rounded-full">
          <UserCircleIcon class="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Profile Completion</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ completionPercentage }}% complete</p>
        </div>
      </div>
      <button
        @click="$emit('customize')"
        class="text-primary hover:text-primary-dark text-sm font-medium"
      >
        Customize
      </button>
    </div>

    <!-- Progress Bar -->
    <div class="mb-4">
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          class="bg-primary h-2 rounded-full transition-all duration-300"
          :style="`width: ${completionPercentage}%`"
        ></div>
      </div>
    </div>

    <!-- Missing Fields -->
    <div v-if="missingFields.length > 0" class="space-y-2">
      <p class="text-sm font-medium text-gray-900 dark:text-white">Complete your profile:</p>
      <div class="space-y-1">
        <div
          v-for="field in missingFields.slice(0, 3)"
          :key="field"
          class="flex items-center text-sm text-gray-600 dark:text-gray-400"
        >
          <div class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
          {{ field }}
        </div>
        <p v-if="missingFields.length > 3" class="text-xs text-gray-500 dark:text-gray-400 ml-4">
          +{{ missingFields.length - 3 }} more fields
        </p>
      </div>
    </div>

    <!-- Completion Message -->
    <div v-else class="flex items-center text-sm text-green-600 dark:text-green-400">
      <CheckCircleIcon class="h-4 w-4 mr-2" />
      Your profile is complete!
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { UserCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

// Emits
defineEmits(['customize'])

// Composables
const authStore = useAuthStore()

// Computed
const completionPercentage = computed(() => {
  const user = authStore.user
  if (!user) return 0

  const requiredFields = ['name', 'email', 'phone', 'location']
  const userTypeFields = {
    fundi: ['specialization', 'experience', 'hourlyRate', 'description'],
    business: ['businessName', 'businessType', 'industry', 'description'],
    user: ['bio']
  }

  const allRequiredFields = [
    ...requiredFields,
    ...(userTypeFields[user.userType] || [])
  ]

  const completedFields = allRequiredFields.filter(field => {
    const value = user[field]
    return value && value.toString().trim().length > 0
  })

  return Math.round((completedFields.length / allRequiredFields.length) * 100)
})

const missingFields = computed(() => {
  const user = authStore.user
  if (!user) return []

  const fieldLabels = {
    name: 'Full Name',
    phone: 'Phone Number',
    location: 'Location',
    bio: 'Bio',
    specialization: 'Specialization',
    experience: 'Years of Experience',
    hourlyRate: 'Hourly Rate',
    description: 'Professional Description',
    businessName: 'Business Name',
    businessType: 'Business Type',
    industry: 'Industry',
    avatar: 'Profile Photo'
  }

  const requiredFields = ['name', 'phone', 'location']
  const userTypeFields = {
    fundi: ['specialization', 'experience', 'hourlyRate', 'description'],
    business: ['businessName', 'businessType', 'industry', 'description'],
    user: ['bio']
  }

  const allRequiredFields = [
    ...requiredFields,
    ...(userTypeFields[user.userType] || [])
  ]

  // Add avatar if missing
  if (!user.avatar) {
    allRequiredFields.push('avatar')
  }

  const missing = allRequiredFields.filter(field => {
    const value = user[field]
    return !value || value.toString().trim().length === 0
  })

  return missing.map(field => fieldLabels[field] || field)
})
</script>
