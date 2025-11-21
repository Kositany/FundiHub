<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">🚨 Rate Limit Recovery</h1>
          <p class="text-gray-600">Resolve rate limiting and authentication issues</p>
        </div>

        <!-- Current Status -->
        <div class="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
          <div class="flex items-center space-x-2 mb-3">
            <div class="w-4 h-4 rounded-full bg-yellow-400"></div>
            <span class="font-medium text-yellow-800">Rate Limited - Need to Wait</span>
          </div>
          <div class="text-sm text-yellow-700 space-y-1">
            <div>⚠️ Appwrite has rate limited this IP due to multiple failed login attempts</div>
            <div>🕒 Wait time: {{ Math.max(0, waitTime) }} seconds remaining</div>
            <div>💡 Recommendation: Use the Quick Online Test for simpler user creation</div>
          </div>
        </div>

        <!-- Wait Timer -->
        <div v-if="waitTime > 0" class="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 class="font-semibold text-blue-800 mb-2">⏳ Automatic Recovery Timer</h3>
          <div class="flex items-center space-x-4">
            <div class="flex-1 bg-blue-200 rounded-full h-2">
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                :style="{ width: `${Math.max(0, 100 - (waitTime / initialWaitTime) * 100)}%` }"
              ></div>
            </div>
            <span class="text-blue-700 font-mono">{{ formatTime(waitTime) }}</span>
          </div>
        </div>

        <!-- Recovery Actions -->
        <div class="space-y-4">
          <!-- Create Real Admin Account -->
          <div class="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 class="text-lg font-semibold text-green-800 mb-4">📝 Create Real Admin Account</h3>
            <p class="text-sm text-green-700 mb-4">
              The test admin account doesn't exist in your Appwrite instance. Let's create a real one.
            </p>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                <input 
                  v-model="adminData.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="admin@yourdomain.com"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  v-model="adminData.password"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="AdminPassword123!"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Admin Name</label>
                <input 
                  v-model="adminData.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="FundiHub Admin"
                >
              </div>
              <div class="flex items-end">
                <button 
                  @click="createRealAdmin"
                  :disabled="creating || waitTime > 0"
                  class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {{ creating ? '🔄 Creating...' : '✅ Create Admin' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Alternative: Use Existing Account -->
          <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 class="text-lg font-semibold text-blue-800 mb-4">🔑 Use Existing Account</h3>
            <p class="text-sm text-blue-700 mb-4">
              If you already have an account in Appwrite, you can use it instead.
            </p>
            
            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input 
                  v-model="existingUser.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  v-model="existingUser.password"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="YourPassword"
                >
              </div>
              <div class="flex items-end">
                <button 
                  @click="loginExisting"
                  :disabled="logging || waitTime > 0"
                  class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {{ logging ? '🔄 Logging...' : '🔑 Login' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Check Rate Limit Status -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">🔍 Check Status</h3>
            <div class="flex space-x-4">
              <button 
                @click="checkRateLimit"
                :disabled="checking"
                class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {{ checking ? '🔄 Checking...' : '🔍 Check Rate Limit' }}
              </button>
              <button 
                @click="resetTimer"
                class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
              >
                🔄 Reset Timer
              </button>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div v-if="result" class="mt-6 p-4 rounded-lg" :class="result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          <h3 class="font-semibold mb-2">{{ result.success ? '✅ Success' : '❌ Error' }}</h3>
          <p class="text-sm mb-2">{{ result.message }}</p>
          <pre v-if="result.details" class="text-xs bg-white p-2 rounded overflow-auto max-h-40">{{ result.details }}</pre>
        </div>

        <!-- Quick Solutions -->
        <div class="mt-8 bg-indigo-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-indigo-800 mb-4">🚀 Quick Solutions</h3>
          <div class="space-y-2 text-sm text-indigo-700">
            <div><strong>✅ Recommended:</strong> Use the Quick Online Test (no authentication needed)</div>
            <div><strong>⏳ Wait:</strong> Let the rate limit expire (usually 15-30 minutes)</div>
            <div><strong>🌐 Alternative:</strong> Try from a different network/IP address</div>
            <div><strong>📧 Create Real Account:</strong> Make an actual admin account instead of test credentials</div>
          </div>
          
          <div class="mt-4 flex flex-wrap gap-3">
            <router-link 
              to="/quick-online-test" 
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              🧪 Quick Online Test
            </router-link>
            <router-link 
              to="/user-management" 
              class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              👥 User Management
            </router-link>
            <router-link 
              to="/" 
              class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              🏠 Main App
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { account } from '@/services/appwrite'
import { useAuthStore } from '@/stores/auth'
import { ID } from 'appwrite'

const auth = useAuthStore()

// State
const waitTime = ref(900) // 15 minutes in seconds
const initialWaitTime = ref(900)
const creating = ref(false)
const logging = ref(false)
const checking = ref(false)
const result = ref(null)

const adminData = ref({
  email: 'admin@fundihub.com',
  password: 'AdminFundi123!',
  name: 'FundiHub Administrator'
})

const existingUser = ref({
  email: '',
  password: ''
})

let timerInterval = null

// Format time as MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Create a real admin account
const createRealAdmin = async () => {
  creating.value = true
  result.value = null
  
  try {
    console.log('📝 Creating real admin account...')
    
    // Create Appwrite account
    const newAccount = await account.create(
      ID.unique(),
      adminData.value.email,
      adminData.value.password,
      adminData.value.name
    )
    
    console.log('✅ Admin account created:', newAccount.$id)
    
    // Try to login immediately
    await account.createEmailPasswordSession(
      adminData.value.email,
      adminData.value.password
    )
    
    console.log('✅ Admin logged in successfully')
    
    result.value = {
      success: true,
      message: `Admin account created and logged in successfully!`,
      details: JSON.stringify({
        accountId: newAccount.$id,
        email: adminData.value.email,
        name: adminData.value.name,
        createdAt: new Date().toISOString()
      }, null, 2)
    }
    
    // Update auth store
    await auth.fetchUserProfile(newAccount.$id)
    
  } catch (error) {
    console.error('❌ Create admin error:', error)
    
    let message = 'Failed to create admin account'
    if (error.code === 429) {
      message = 'Still rate limited. Please wait longer.'
    } else if (error.code === 409) {
      message = 'Account already exists. Try logging in instead.'
    } else if (error.message) {
      message = error.message
    }
    
    result.value = {
      success: false,
      message,
      details: `Error ${error.code}: ${error.message}`
    }
  } finally {
    creating.value = false
  }
}

// Login with existing account
const loginExisting = async () => {
  logging.value = true
  result.value = null
  
  try {
    console.log('🔑 Logging in with existing account...')
    
    const loginResult = await auth.login(
      existingUser.value.email,
      existingUser.value.password
    )
    
    if (loginResult.success) {
      result.value = {
        success: true,
        message: `Login successful! Welcome ${loginResult.user.name}`,
        details: `Logged in as ${loginResult.user.email} (${loginResult.user.userType})`
      }
    } else {
      throw new Error('Login failed')
    }
    
  } catch (error) {
    console.error('❌ Login error:', error)
    
    let message = 'Login failed'
    if (error.message.includes('Rate limit') || error.code === 429) {
      message = 'Still rate limited. Please wait longer.'
    } else if (error.code === 401) {
      message = 'Invalid credentials. Check your email and password.'
    } else if (error.message) {
      message = error.message
    }
    
    result.value = {
      success: false,
      message,
      details: error.message
    }
  } finally {
    logging.value = false
  }
}

// Check current rate limit status
const checkRateLimit = async () => {
  checking.value = true
  result.value = null
  
  try {
    console.log('🔍 Checking rate limit status...')
    
    // Try a simple health check
    const response = await fetch('https://nyc.cloud.appwrite.io/v1/health', {
      method: 'GET',
      headers: {
        'X-Appwrite-Project': import.meta.env.VITE_APPWRITE_PROJECT_ID
      }
    })
    
    if (response.status === 429) {
      result.value = {
        success: false,
        message: 'Still rate limited. Wait longer.',
        details: `Status: ${response.status} - ${response.statusText}`
      }
    } else {
      result.value = {
        success: true,
        message: 'Rate limit appears to be cleared!',
        details: `Status: ${response.status} - You can try creating accounts now.`
      }
      waitTime.value = 0
    }
    
  } catch (error) {
    result.value = {
      success: false,
      message: 'Could not check status',
      details: error.message
    }
  } finally {
    checking.value = false
  }
}

// Reset the timer
const resetTimer = () => {
  waitTime.value = 900
  initialWaitTime.value = 900
  result.value = {
    success: true,
    message: 'Timer reset to 15 minutes',
    details: 'This is just a local timer reset. The actual rate limit is controlled by Appwrite.'
  }
}

// Start countdown timer
const startTimer = () => {
  timerInterval = setInterval(() => {
    if (waitTime.value > 0) {
      waitTime.value -= 1
    } else {
      clearInterval(timerInterval)
    }
  }, 1000)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>
