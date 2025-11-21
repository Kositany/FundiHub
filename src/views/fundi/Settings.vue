<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
            <p class="text-gray-600">Manage your account preferences and professional settings</p>
          </div>
          <div class="flex space-x-3">
            <button @click="saveAllSettings" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Save Changes</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-4 gap-6">
        <!-- Settings Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow">
            <nav class="space-y-1 p-4">
              <button 
                v-for="section in settingSections" 
                :key="section.id"
                @click="activeSection = section.id"
                :class="activeSection === section.id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-gray-50'"
                class="w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <span class="flex items-center space-x-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="section.icon"></path>
                  </svg>
                  <span>{{ section.name }}</span>
                </span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Settings Content -->
        <div class="lg:col-span-3">
          <!-- Profile Settings -->
          <div v-if="activeSection === 'profile'" class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    v-model="profileSettings.firstName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    v-model="profileSettings.lastName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                <input 
                  v-model="profileSettings.title"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Licensed Plumber, Certified Technician"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea 
                  v-model="profileSettings.bio"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell clients about your experience and expertise..."
                ></textarea>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    v-model="profileSettings.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <select 
                    v-model="profileSettings.experience"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Service Areas</label>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span v-for="area in profileSettings.serviceAreas" :key="area" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {{ area }}
                    <button @click="removeServiceArea(area)" class="ml-2 text-blue-600 hover:text-blue-800">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </span>
                </div>
                <div class="flex space-x-2">
                  <input 
                    v-model="newServiceArea"
                    type="text"
                    placeholder="Add service area..."
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <button @click="addServiceArea" type="button" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Notification Settings -->
          <div v-if="activeSection === 'notifications'" class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
            <div class="space-y-6">
              <div>
                <h4 class="font-medium text-gray-900 mb-4">Email Notifications</h4>
                <div class="space-y-3">
                  <div v-for="notification in emailNotifications" :key="notification.id" class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-sm text-gray-600">{{ notification.description }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="notification.enabled" type="checkbox" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 mb-4">SMS Notifications</h4>
                <div class="space-y-3">
                  <div v-for="notification in smsNotifications" :key="notification.id" class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-sm text-gray-600">{{ notification.description }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="notification.enabled" type="checkbox" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Availability Settings -->
          <div v-if="activeSection === 'availability'" class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Availability Settings</h3>
            <div class="space-y-6">
              <div>
                <h4 class="font-medium text-gray-900 mb-4">Working Hours</h4>
                <div class="space-y-4">
                  <div v-for="day in workingHours" :key="day.day" class="flex items-center space-x-4">
                    <div class="w-20">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input v-model="day.enabled" type="checkbox" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div class="w-24">
                      <span class="text-sm font-medium text-gray-900">{{ day.day }}</span>
                    </div>
                    <div class="flex items-center space-x-2" :class="day.enabled ? '' : 'opacity-50'">
                      <input 
                        v-model="day.startTime"
                        type="time"
                        :disabled="!day.enabled"
                        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                      <span class="text-gray-500">to</span>
                      <input 
                        v-model="day.endTime"
                        type="time"
                        :disabled="!day.enabled"
                        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 mb-4">Emergency Services</h4>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Available for emergency calls</p>
                    <p class="text-sm text-gray-600">Receive urgent booking requests outside normal hours</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="emergencyAvailable" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Settings -->
          <div v-if="activeSection === 'payment'" class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Payment Settings</h3>
            <div class="space-y-6">
              <div>
                <h4 class="font-medium text-gray-900 mb-4">Payment Methods</h4>
                <div class="space-y-4">
                  <div v-for="method in paymentMethods" :key="method.id" class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <div :class="method.color" class="p-2 rounded-lg">
                          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path v-if="method.type === 'bank'" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
                            <path v-else-if="method.type === 'mobile'" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">{{ method.name }}</p>
                          <p class="text-sm text-gray-600">{{ method.details }}</p>
                        </div>
                      </div>
                      <div class="flex space-x-2">
                        <button @click="editPaymentMethod(method)" class="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                        <button @click="removePaymentMethod(method)" class="text-red-600 hover:text-red-800 text-sm">Remove</button>
                      </div>
                    </div>
                  </div>
                  <button @click="addPaymentMethod" class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 hover:text-gray-700">
                    <span class="flex items-center justify-center space-x-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      <span>Add Payment Method</span>
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 mb-4">Pricing Settings</h4>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (KES)</label>
                    <input 
                      v-model="pricingSettings.hourlyRate"
                      type="number"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Rate Multiplier</label>
                    <select 
                      v-model="pricingSettings.emergencyMultiplier"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                      <option value="2.5">2.5x</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Privacy Settings -->
          <div v-if="activeSection === 'privacy'" class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Privacy & Security</h3>
            <div class="space-y-6">
              <div>
                <h4 class="font-medium text-gray-900 mb-4">Profile Visibility</h4>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-900">Public Profile</p>
                      <p class="text-sm text-gray-600">Allow your profile to be visible in search results</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="privacySettings.publicProfile" type="checkbox" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-900">Show Phone Number</p>
                      <p class="text-sm text-gray-600">Display your phone number on your public profile</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input v-model="privacySettings.showPhone" type="checkbox" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 mb-4">Security</h4>
                <div class="space-y-4">
                  <button @click="changePassword" class="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <p class="font-medium text-gray-900">Change Password</p>
                    <p class="text-sm text-gray-600">Update your account password</p>
                  </button>
                  <button @click="enableTwoFactor" class="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <p class="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p class="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Settings -->
          <div v-if="activeSection === 'account'" class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Account Management</h3>
            <div class="space-y-6">
              <div>
                <h4 class="font-medium text-gray-900 mb-4">Account Status</h4>
                <div class="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-green-800 font-medium">Account Verified</span>
                  </div>
                  <p class="text-green-700 text-sm mt-1">Your account is fully verified and active</p>
                </div>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 mb-4">Data Export</h4>
                <button @click="exportData" class="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <p class="font-medium text-gray-900">Download Your Data</p>
                  <p class="text-sm text-gray-600">Export all your account data and activity</p>
                </button>
              </div>

              <div>
                <h4 class="font-medium text-red-600 mb-4">Danger Zone</h4>
                <div class="space-y-3">
                  <button @click="deactivateAccount" class="w-full text-left p-4 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100">
                    <p class="font-medium text-red-900">Deactivate Account</p>
                    <p class="text-sm text-red-700">Temporarily disable your account</p>
                  </button>
                  <button @click="deleteAccount" class="w-full text-left p-4 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100">
                    <p class="font-medium text-red-900">Delete Account</p>
                    <p class="text-sm text-red-700">Permanently delete your account and all data</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const activeSection = ref('profile')
const newServiceArea = ref('')
const emergencyAvailable = ref(true)

const settingSections = ref([
  {
    id: 'profile',
    name: 'Profile',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
  },
  {
    id: 'availability',
    name: 'Availability',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 'payment',
    name: 'Payment',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
  },
  {
    id: 'privacy',
    name: 'Privacy',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
  },
  {
    id: 'account',
    name: 'Account',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  }
])

const profileSettings = ref({
  firstName: 'John',
  lastName: 'Doe',
  title: 'Licensed Plumber & Water Systems Specialist',
  bio: 'Experienced plumber with over 8 years in residential and commercial plumbing. Specialized in emergency repairs, pipe installations, and water heater services.',
  phone: '+254712345678',
  experience: '6-10',
  serviceAreas: ['Nairobi CBD', 'Westlands', 'Karen', 'Kilimani']
})

const emailNotifications = ref([
  {
    id: 'new_booking',
    title: 'New Bookings',
    description: 'Get notified when you receive new booking requests',
    enabled: true
  },
  {
    id: 'payment_received',
    title: 'Payment Received',
    description: 'Notifications when payments are processed',
    enabled: true
  },
  {
    id: 'review_received',
    title: 'New Reviews',
    description: 'Get notified when clients leave reviews',
    enabled: true
  },
  {
    id: 'profile_viewed',
    title: 'Profile Views',
    description: 'Weekly summary of profile views and engagement',
    enabled: false
  }
])

const smsNotifications = ref([
  {
    id: 'urgent_booking',
    title: 'Urgent Bookings',
    description: 'SMS alerts for emergency and urgent requests',
    enabled: true
  },
  {
    id: 'booking_reminder',
    title: 'Booking Reminders',
    description: 'Reminders 1 hour before scheduled appointments',
    enabled: true
  },
  {
    id: 'payment_due',
    title: 'Payment Due',
    description: 'Notifications when client payments are overdue',
    enabled: false
  }
])

const workingHours = ref([
  { day: 'Monday', enabled: true, startTime: '08:00', endTime: '17:00' },
  { day: 'Tuesday', enabled: true, startTime: '08:00', endTime: '17:00' },
  { day: 'Wednesday', enabled: true, startTime: '08:00', endTime: '17:00' },
  { day: 'Thursday', enabled: true, startTime: '08:00', endTime: '17:00' },
  { day: 'Friday', enabled: true, startTime: '08:00', endTime: '17:00' },
  { day: 'Saturday', enabled: true, startTime: '09:00', endTime: '15:00' },
  { day: 'Sunday', enabled: false, startTime: '09:00', endTime: '15:00' }
])

const paymentMethods = ref([
  {
    id: 1,
    name: 'M-Pesa',
    type: 'mobile',
    details: '254712345678',
    color: 'bg-green-500'
  },
  {
    id: 2,
    name: 'Equity Bank',
    type: 'bank',
    details: 'Account: ****4532',
    color: 'bg-blue-500'
  }
])

const pricingSettings = ref({
  hourlyRate: 1500,
  emergencyMultiplier: 2
})

const privacySettings = ref({
  publicProfile: true,
  showPhone: true
})

// Methods
const updateProfile = () => {
  console.log('Updating profile...', profileSettings.value)
}

const addServiceArea = () => {
  if (newServiceArea.value.trim()) {
    profileSettings.value.serviceAreas.push(newServiceArea.value.trim())
    newServiceArea.value = ''
  }
}

const removeServiceArea = (area) => {
  const index = profileSettings.value.serviceAreas.indexOf(area)
  if (index > -1) {
    profileSettings.value.serviceAreas.splice(index, 1)
  }
}

const addPaymentMethod = () => {
  console.log('Adding payment method...')
}

const editPaymentMethod = (method) => {
  console.log('Editing payment method:', method)
}

const removePaymentMethod = (method) => {
  const index = paymentMethods.value.findIndex(m => m.id === method.id)
  if (index > -1) {
    paymentMethods.value.splice(index, 1)
  }
}

const changePassword = () => {
  console.log('Opening change password modal...')
}

const enableTwoFactor = () => {
  console.log('Setting up two-factor authentication...')
}

const exportData = () => {
  console.log('Exporting user data...')
}

const deactivateAccount = () => {
  console.log('Deactivating account...')
}

const deleteAccount = () => {
  console.log('Deleting account...')
}

const saveAllSettings = () => {
  console.log('Saving all settings...')
}
</script>
