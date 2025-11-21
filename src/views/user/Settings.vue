<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
            <p class="text-gray-600">Manage your account settings and preferences</p>
          </div>
          <div class="flex space-x-3">
            <button @click="resetSettings" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              Reset to Default
            </button>
            <button @click="saveSettings" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- Settings Navigation -->
      <div class="bg-white rounded-lg shadow">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button 
              v-for="tab in settingsTabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-4 px-1 border-b-2 font-medium text-sm"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="p-6">
          <!-- Profile Settings -->
          <div v-if="activeTab === 'profile'" class="space-y-6">
            <div class="flex items-center space-x-6">
              <div class="relative">
                <img :src="profile.avatar" :alt="profile.name" class="w-20 h-20 rounded-full">
                <button @click="changeAvatar" class="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </button>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">Profile Photo</h3>
                <p class="text-sm text-gray-500">This will be displayed on your profile and reviews</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  v-model="profile.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  v-model="profile.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  v-model="profile.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  v-model="profile.location"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea 
                v-model="profile.bio"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
          </div>

          <!-- Notification Settings -->
          <div v-if="activeTab === 'notifications'" class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Email Notifications</h3>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">New Messages</p>
                    <p class="text-sm text-gray-500">Get notified when you receive new messages from fundis</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.email.messages" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Booking Updates</p>
                    <p class="text-sm text-gray-500">Get notified about booking confirmations, cancellations, and updates</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.email.bookings" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Promotions & Tips</p>
                    <p class="text-sm text-gray-500">Receive helpful tips and promotional offers</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.email.promotions" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Enable Push Notifications</p>
                    <p class="text-sm text-gray-500">Receive notifications on your device</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.push.enabled" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Sound</p>
                    <p class="text-sm text-gray-500">Play sound when receiving notifications</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.push.sound" type="checkbox" class="sr-only peer" :disabled="!notifications.push.enabled">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Privacy Settings -->
          <div v-if="activeTab === 'privacy'" class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Profile Visibility</h3>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Show Profile to Fundis</p>
                    <p class="text-sm text-gray-500">Allow fundis to see your profile information</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="privacy.profileVisible" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Show Contact Information</p>
                    <p class="text-sm text-gray-500">Display your phone number and email to fundis you've booked</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="privacy.contactVisible" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Allow Location Tracking</p>
                    <p class="text-sm text-gray-500">Help us find fundis near you based on your location</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="privacy.locationTracking" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Data & Analytics</h3>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Usage Analytics</p>
                    <p class="text-sm text-gray-500">Help us improve the platform by sharing anonymous usage data</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="privacy.analytics" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">Marketing Communications</p>
                    <p class="text-sm text-gray-500">Receive personalized recommendations and offers</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="privacy.marketing" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div v-if="activeTab === 'security'" class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Password & Authentication</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input 
                    v-model="security.currentPassword"
                    type="password"
                    class="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input 
                    v-model="security.newPassword"
                    type="password"
                    class="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input 
                    v-model="security.confirmPassword"
                    type="password"
                    class="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>

                <button @click="updatePassword" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
              
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-sm font-medium text-gray-900">Enable 2FA</p>
                  <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="security.twoFactorEnabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div v-if="security.twoFactorEnabled" class="space-y-3">
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div class="flex">
                    <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-green-800">Two-factor authentication is enabled</h3>
                      <p class="text-sm text-green-700 mt-1">Your account is protected with 2FA using SMS verification.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Login Sessions</h3>
              
              <div class="space-y-3">
                <div v-for="session in security.sessions" :key="session.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div class="p-2 bg-gray-100 rounded-lg">
                      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ session.device }}</p>
                      <p class="text-sm text-gray-500">{{ session.location }} • {{ session.lastActive }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span v-if="session.current" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Current
                    </span>
                    <button v-else @click="revokeSession(session.id)" class="text-red-600 hover:text-red-800 text-sm font-medium">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Settings -->
          <div v-if="activeTab === 'account'" class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Account Information</h3>
              
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm font-medium text-gray-700">Account Created</p>
                    <p class="text-sm text-gray-900">{{ account.createdAt }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-700">Account Type</p>
                    <p class="text-sm text-gray-900">{{ account.type }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-700">Total Bookings</p>
                    <p class="text-sm text-gray-900">{{ account.totalBookings }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-700">Total Spent</p>
                    <p class="text-sm text-gray-900">KES {{ account.totalSpent.toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Data Export</h3>
              
              <div class="space-y-3">
                <p class="text-sm text-gray-600">Download a copy of your data including bookings, reviews, and messages.</p>
                <button @click="exportData" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Request Data Export
                </button>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
              
              <div class="space-y-4">
                <div class="border border-red-200 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-red-900 mb-2">Deactivate Account</h4>
                  <p class="text-sm text-red-700 mb-3">Temporarily disable your account. You can reactivate it anytime.</p>
                  <button @click="deactivateAccount" class="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200">
                    Deactivate Account
                  </button>
                </div>

                <div class="border border-red-200 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-red-900 mb-2">Delete Account</h4>
                  <p class="text-sm text-red-700 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <button @click="deleteAccount" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    Delete Account
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const router = useRouter()
const activeTab = ref('profile')

const settingsTabs = [
  { id: 'profile', name: 'Profile' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'privacy', name: 'Privacy' },
  { id: 'security', name: 'Security' },
  { id: 'account', name: 'Account' }
]

const profile = reactive({
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+254 712 345 678',
  location: 'Nairobi, Kenya',
  bio: 'Looking for reliable fundis for home improvement projects.',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150'
})

const notifications = reactive({
  email: {
    messages: true,
    bookings: true,
    promotions: false
  },
  push: {
    enabled: true,
    sound: true
  }
})

const privacy = reactive({
  profileVisible: true,
  contactVisible: true,
  locationTracking: true,
  analytics: true,
  marketing: false
})

const security = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorEnabled: false,
  sessions: [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Nairobi, Kenya',
      lastActive: '2 hours ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Nairobi, Kenya',
      lastActive: '1 day ago',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Android',
      location: 'Mombasa, Kenya',
      lastActive: '3 days ago',
      current: false
    }
  ]
})

const account = reactive({
  createdAt: 'January 15, 2024',
  type: 'Standard User',
  totalBookings: 12,
  totalSpent: 156000
})

// Methods
const saveSettings = () => {
  console.log('Saving settings...')
  // Implement save logic
}

const resetSettings = () => {
  if (confirm('Are you sure you want to reset all settings to default values?')) {
    console.log('Resetting settings...')
    // Implement reset logic
  }
}

const changeAvatar = () => {
  console.log('Opening avatar upload...')
}

const updatePassword = () => {
  if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
    alert('Please fill in all password fields')
    return
  }

  if (security.newPassword !== security.confirmPassword) {
    alert('New passwords do not match')
    return
  }

  console.log('Updating password...')
  // Implement password update logic
}

const revokeSession = (sessionId) => {
  if (confirm('Are you sure you want to revoke this session?')) {
    security.sessions = security.sessions.filter(s => s.id !== sessionId)
  }
}

const exportData = () => {
  console.log('Requesting data export...')
}

const deactivateAccount = () => {
  if (confirm('Are you sure you want to deactivate your account? You can reactivate it anytime by logging in.')) {
    console.log('Deactivating account...')
  }
}

const deleteAccount = () => {
  const confirmation = prompt('Type "DELETE" to confirm account deletion:')
  if (confirmation === 'DELETE') {
    console.log('Deleting account...')
    // Implement account deletion logic
  } else {
    alert('Account deletion cancelled')
  }
}
</script>
