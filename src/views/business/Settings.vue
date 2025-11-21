<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
            <p class="text-gray-600">Manage your account and business preferences</p>
          </div>
          <button @click="saveAllSettings" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Save All Changes
          </button>
        </div>
      </div>

      <!-- Settings Navigation -->
      <div class="bg-white rounded-lg shadow">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6" aria-label="Tabs">
            <button 
              v-for="tab in settingsTabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Profile Settings -->
        <div v-show="activeTab === 'profile'" class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Business Profile</h3>
          
          <div class="space-y-6">
            <!-- Business Logo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Logo</label>
              <div class="flex items-center space-x-4">
                <img :src="profileSettings.logo" alt="Business Logo" class="w-20 h-20 rounded-lg object-cover">
                <div>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                    Upload New Logo
                  </button>
                  <p class="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </div>

            <!-- Business Information -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input 
                  v-model="profileSettings.businessName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <select v-model="profileSettings.businessType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Type</option>
                  <option value="construction">Construction Company</option>
                  <option value="contracting">General Contracting</option>
                  <option value="property">Property Management</option>
                  <option value="individual">Individual</option>
                </select>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input 
                  v-model="profileSettings.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  v-model="profileSettings.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
              <textarea 
                v-model="profileSettings.address"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
              <textarea 
                v-model="profileSettings.description"
                rows="4"
                placeholder="Describe your business, services, and expertise..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div v-show="activeTab === 'notifications'" class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          
          <div class="space-y-6">
            <!-- Email Notifications -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Email Notifications</h4>
              <div class="space-y-3">
                <div v-for="notification in notificationSettings.email" :key="notification.id" class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-700">{{ notification.title }}</p>
                    <p class="text-sm text-gray-500">{{ notification.description }}</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notification.enabled" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Push Notifications -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Push Notifications</h4>
              <div class="space-y-3">
                <div v-for="notification in notificationSettings.push" :key="notification.id" class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-700">{{ notification.title }}</p>
                    <p class="text-sm text-gray-500">{{ notification.description }}</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notification.enabled" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- SMS Notifications -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">SMS Notifications</h4>
              <div class="space-y-3">
                <div v-for="notification in notificationSettings.sms" :key="notification.id" class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-700">{{ notification.title }}</p>
                    <p class="text-sm text-gray-500">{{ notification.description }}</p>
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

        <!-- Privacy & Security -->
        <div v-show="activeTab === 'security'" class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
          
          <div class="space-y-6">
            <!-- Password Change -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Change Password</h4>
              <div class="space-y-4 max-w-md">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input 
                    v-model="securitySettings.currentPassword"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input 
                    v-model="securitySettings.newPassword"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input 
                    v-model="securitySettings.confirmPassword"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </div>

            <!-- Two-Factor Authentication -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p class="text-sm font-medium text-gray-700">Enable 2FA</p>
                  <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="securitySettings.twoFactorEnabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <!-- Login Sessions -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Active Sessions</h4>
              <div class="space-y-3">
                <div v-for="session in securitySettings.activeSessions" :key="session.id" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div class="p-2 bg-gray-100 rounded-lg">
                      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-700">{{ session.device }}</p>
                      <p class="text-sm text-gray-500">{{ session.location }} • {{ session.lastActive }}</p>
                    </div>
                  </div>
                  <button v-if="!session.current" @click="revokeSession(session.id)" class="text-red-600 hover:text-red-700 text-sm">
                    Revoke
                  </button>
                  <span v-else class="text-green-600 text-sm font-medium">Current</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Settings -->
        <div v-show="activeTab === 'payment'" class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>
          
          <div class="space-y-6">
            <!-- Payment Methods -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Payment Methods</h4>
              <div class="space-y-3">
                <div v-for="method in paymentSettings.methods" :key="method.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div class="p-2 bg-gray-100 rounded-lg">
                      <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-700">{{ method.type }}</p>
                      <p class="text-sm text-gray-500">**** **** **** {{ method.last4 }}</p>
                    </div>
                    <span v-if="method.default" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Default</span>
                  </div>
                  <div class="flex space-x-2">
                    <button v-if="!method.default" @click="setDefaultPayment(method.id)" class="text-blue-600 hover:text-blue-700 text-sm">
                      Set Default
                    </button>
                    <button @click="removePaymentMethod(method.id)" class="text-red-600 hover:text-red-700 text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <button @click="showAddPayment = true" class="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Add Payment Method</span>
              </button>
            </div>

            <!-- Billing Address -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Billing Address</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input 
                    v-model="paymentSettings.billingAddress.street"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    v-model="paymentSettings.billingAddress.city"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input 
                    v-model="paymentSettings.billingAddress.state"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                  <input 
                    v-model="paymentSettings.billingAddress.zip"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
              </div>
            </div>

            <!-- Subscription -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Subscription</h4>
              <div class="p-4 bg-blue-50 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-blue-900">Business Pro Plan</p>
                    <p class="text-sm text-blue-700">$49/month • Next billing: March 15, 2024</p>
                  </div>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- API & Integrations -->
        <div v-show="activeTab === 'integrations'" class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">API & Integrations</h3>
          
          <div class="space-y-6">
            <!-- API Keys -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">API Keys</h4>
              <div class="space-y-3">
                <div v-for="key in integrationSettings.apiKeys" :key="key.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p class="text-sm font-medium text-gray-700">{{ key.name }}</p>
                    <p class="text-sm text-gray-500 font-mono">{{ key.key }}</p>
                    <p class="text-xs text-gray-400">Created: {{ key.created }}</p>
                  </div>
                  <div class="flex space-x-2">
                    <button @click="regenerateKey(key.id)" class="text-blue-600 hover:text-blue-700 text-sm">
                      Regenerate
                    </button>
                    <button @click="revokeKey(key.id)" class="text-red-600 hover:text-red-700 text-sm">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
              <button @click="createApiKey" class="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Create API Key</span>
              </button>
            </div>

            <!-- Third-party Integrations -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Third-party Integrations</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div v-for="integration in integrationSettings.thirdParty" :key="integration.id" class="p-4 border border-gray-200 rounded-lg">
                  <div class="flex items-center space-x-3 mb-3">
                    <img :src="integration.logo" :alt="integration.name" class="w-8 h-8">
                    <div>
                      <p class="text-sm font-medium text-gray-700">{{ integration.name }}</p>
                      <p class="text-xs text-gray-500">{{ integration.description }}</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span :class="integration.connected ? 'text-green-600' : 'text-gray-500'" class="text-sm">
                      {{ integration.connected ? 'Connected' : 'Not Connected' }}
                    </span>
                    <button 
                      @click="toggleIntegration(integration.id)"
                      :class="integration.connected ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'"
                      class="text-white px-3 py-1 rounded text-sm"
                    >
                      {{ integration.connected ? 'Disconnect' : 'Connect' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Payment Method Modal -->
    <div v-if="showAddPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Add Payment Method</h2>
          <button @click="showAddPayment = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="addPaymentMethod" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input 
              v-model="newPaymentMethod.cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
              <input 
                v-model="newPaymentMethod.expiry"
                type="text"
                placeholder="MM/YY"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input 
                v-model="newPaymentMethod.cvv"
                type="text"
                placeholder="123"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
            <input 
              v-model="newPaymentMethod.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" @click="showAddPayment = false" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add Payment Method
            </button>
          </div>
        </form>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const activeTab = ref('profile')
const showAddPayment = ref(false)

const settingsTabs = ref([
  { id: 'profile', name: 'Profile' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'security', name: 'Security' },
  { id: 'payment', name: 'Payment' },
  { id: 'integrations', name: 'Integrations' }
])

const profileSettings = ref({
  logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
  businessName: 'TechCorp Solutions',
  businessType: 'construction',
  email: 'business@techcorp.com',
  phone: '+254 712 345 678',
  address: '123 Business Street, Nairobi, Kenya',
  description: 'Leading construction and renovation company specializing in commercial and residential projects.'
})

const notificationSettings = ref({
  email: [
    { id: 1, title: 'New Project Requests', description: 'Get notified when new projects are available', enabled: true },
    { id: 2, title: 'Payment Received', description: 'Notifications for successful payments', enabled: true },
    { id: 3, title: 'Project Updates', description: 'Updates on project progress and milestones', enabled: true },
    { id: 4, title: 'Weekly Reports', description: 'Weekly summary of business performance', enabled: false }
  ],
  push: [
    { id: 1, title: 'Urgent Messages', description: 'Immediate notifications for urgent communications', enabled: true },
    { id: 2, title: 'Project Milestones', description: 'When project milestones are completed', enabled: true },
    { id: 3, title: 'Team Updates', description: 'Updates from your team members', enabled: false }
  ],
  sms: [
    { id: 1, title: 'Payment Confirmations', description: 'SMS notifications for payment confirmations', enabled: true },
    { id: 2, title: 'Emergency Alerts', description: 'Critical business alerts via SMS', enabled: true }
  ]
})

const securitySettings = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorEnabled: false,
  activeSessions: [
    { id: 1, device: 'Chrome on Windows', location: 'Nairobi, Kenya', lastActive: '2 hours ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Nairobi, Kenya', lastActive: '1 day ago', current: false },
    { id: 3, device: 'Firefox on MacOS', location: 'Mombasa, Kenya', lastActive: '3 days ago', current: false }
  ]
})

const paymentSettings = ref({
  methods: [
    { id: 1, type: 'Visa', last4: '4567', default: true },
    { id: 2, type: 'M-Pesa', last4: '1234', default: false }
  ],
  billingAddress: {
    street: '123 Business Street',
    city: 'Nairobi',
    state: 'Nairobi County',
    zip: '00100'
  }
})

const integrationSettings = ref({
  apiKeys: [
    { id: 1, name: 'Production API', key: 'fh_live_...*****', created: 'Jan 15, 2024' },
    { id: 2, name: 'Test API', key: 'fh_test_...*****', created: 'Dec 20, 2023' }
  ],
  thirdParty: [
    { id: 1, name: 'Slack', description: 'Team communication', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/slack.svg', connected: true },
    { id: 2, name: 'QuickBooks', description: 'Accounting integration', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/quickbooks.svg', connected: false },
    { id: 3, name: 'Google Calendar', description: 'Schedule management', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlecalendar.svg', connected: true },
    { id: 4, name: 'Zapier', description: 'Workflow automation', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/zapier.svg', connected: false }
  ]
})

const newPaymentMethod = ref({
  cardNumber: '',
  expiry: '',
  cvv: '',
  name: ''
})

// Methods
const saveAllSettings = () => {
  console.log('Saving all settings...')
  // Implement save logic
}

const revokeSession = (sessionId) => {
  securitySettings.value.activeSessions = securitySettings.value.activeSessions.filter(s => s.id !== sessionId)
}

const setDefaultPayment = (methodId) => {
  paymentSettings.value.methods.forEach(method => {
    method.default = method.id === methodId
  })
}

const removePaymentMethod = (methodId) => {
  paymentSettings.value.methods = paymentSettings.value.methods.filter(m => m.id !== methodId)
}

const addPaymentMethod = () => {
  console.log('Adding payment method:', newPaymentMethod.value)
  showAddPayment.value = false
  newPaymentMethod.value = { cardNumber: '', expiry: '', cvv: '', name: '' }
}

const regenerateKey = (keyId) => {
  console.log('Regenerating key:', keyId)
}

const revokeKey = (keyId) => {
  integrationSettings.value.apiKeys = integrationSettings.value.apiKeys.filter(k => k.id !== keyId)
}

const createApiKey = () => {
  console.log('Creating new API key...')
}

const toggleIntegration = (integrationId) => {
  const integration = integrationSettings.value.thirdParty.find(i => i.id === integrationId)
  if (integration) {
    integration.connected = !integration.connected
  }
}
</script>
