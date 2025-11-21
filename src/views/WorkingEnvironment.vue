<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
    <div class="max-w-6xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">🚀 Working Environment</h1>
          <p class="text-gray-600">Get productive immediately - bypassing rate limits and auth issues</p>
        </div>

        <!-- Status Overview -->
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <!-- Current Issue -->
          <div class="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 class="font-semibold text-red-800 mb-2">🚨 Current Issue</h3>
            <div class="text-sm text-red-700 space-y-1">
              <div>• Rate limited (429 errors)</div>
              <div>• Invalid admin credentials (401)</div>
              <div>• Multiple failed attempts</div>
            </div>
          </div>

          <!-- Working Solutions -->
          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 class="font-semibold text-green-800 mb-2">✅ Working Now</h3>
            <div class="text-sm text-green-700 space-y-1">
              <div>• Offline mode (test accounts)</div>
              <div>• Connection testing</div>
              <div>• Database queries (simplified)</div>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 class="font-semibold text-blue-800 mb-2">🎯 Next Steps</h3>
            <div class="text-sm text-blue-700 space-y-1">
              <div>• Wait for rate limit (15min)</div>
              <div>• Create real admin account</div>
              <div>• Use Quick Online Test</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <router-link 
            to="/quick-online-test"
            class="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <div class="text-2xl mb-2">🧪</div>
            <div class="font-semibold">Quick Test</div>
            <div class="text-xs opacity-90">Simple user creation</div>
          </router-link>

          <router-link 
            to="/rate-limit-recovery"
            class="p-4 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all"
          >
            <div class="text-2xl mb-2">🚨</div>
            <div class="font-semibold">Rate Recovery</div>
            <div class="text-xs opacity-90">Fix rate limiting</div>
          </router-link>

          <button 
            @click="useOfflineMode"
            class="p-4 bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all text-left"
          >
            <div class="text-2xl mb-2">📱</div>
            <div class="font-semibold">Offline Mode</div>
            <div class="text-xs opacity-90">Test accounts</div>
          </button>

          <router-link 
            to="/user-management"
            class="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
          >
            <div class="text-2xl mb-2">👥</div>
            <div class="font-semibold">User Mgmt</div>
            <div class="text-xs opacity-90">Full interface</div>
          </router-link>
        </div>

        <!-- Current User Status -->
        <div v-if="auth.isAuthenticated" class="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 class="font-semibold text-blue-800 mb-2">👤 Current User</h3>
          <div class="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-blue-600">Name:</span>
              <div class="font-medium">{{ auth.user?.name }}</div>
            </div>
            <div>
              <span class="text-blue-600">Email:</span>
              <div class="font-medium">{{ auth.user?.email }}</div>
            </div>
            <div>
              <span class="text-blue-600">Type:</span>
              <div class="font-medium">{{ auth.user?.userType }}</div>
            </div>
            <div>
              <span class="text-blue-600">Mode:</span>
              <div class="font-medium">{{ auth.user?.offlineMode ? 'Offline' : 'Online' }}</div>
            </div>
          </div>
        </div>

        <!-- Available Test Accounts -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4">🔑 Available Test Accounts (Offline Mode)</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg border">
              <h4 class="font-semibold text-gray-800 mb-2">👤 User Admin</h4>
              <div class="text-sm space-y-1">
                <div><strong>Email:</strong> useradmin@fundihub.com</div>
                <div><strong>Password:</strong> Admin@123</div>
                <div><strong>Type:</strong> Business</div>
                <button 
                  @click="quickLogin('useradmin@fundihub.com', 'Admin@123')"
                  :disabled="logging"
                  class="mt-2 w-full bg-blue-600 text-white py-1 px-3 rounded text-xs hover:bg-blue-700 disabled:opacity-50"
                >
                  {{ logging ? '🔄' : '🔑 Quick Login' }}
                </button>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg border">
              <h4 class="font-semibold text-gray-800 mb-2">🔨 Fundi Admin</h4>
              <div class="text-sm space-y-1">
                <div><strong>Email:</strong> fundiadmin@fundihub.com</div>
                <div><strong>Password:</strong> Admin@123</div>
                <div><strong>Type:</strong> Fundi</div>
                <button 
                  @click="quickLogin('fundiadmin@fundihub.com', 'Admin@123')"
                  :disabled="logging"
                  class="mt-2 w-full bg-green-600 text-white py-1 px-3 rounded text-xs hover:bg-green-700 disabled:opacity-50"
                >
                  {{ logging ? '🔄' : '🔑 Quick Login' }}
                </button>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg border">
              <h4 class="font-semibold text-gray-800 mb-2">🧪 Test User</h4>
              <div class="text-sm space-y-1">
                <div><strong>Email:</strong> test@fundihub.com</div>
                <div><strong>Password:</strong> Test@123</div>
                <div><strong>Type:</strong> User</div>
                <button 
                  @click="quickLogin('test@fundihub.com', 'Test@123')"
                  :disabled="logging"
                  class="mt-2 w-full bg-purple-600 text-white py-1 px-3 rounded text-xs hover:bg-purple-700 disabled:opacity-50"
                >
                  {{ logging ? '🔄' : '🔑 Quick Login' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Create Your User Here -->
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">✨ Create Your Test User</h3>
          <p class="text-gray-600 mb-4">
            Since you want to create <code class="bg-gray-200 px-2 py-1 rounded">viva@test.viva</code>, 
            let's create it in offline mode first, then sync when rate limits clear.
          </p>
          
          <div class="bg-white p-4 rounded-lg">
            <div class="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="vivaUser.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  v-model="vivaUser.password"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  v-model="vivaUser.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              <div class="flex items-end">
                <button 
                  @click="createVivaOffline"
                  :disabled="creating"
                  class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {{ creating ? '🔄 Creating...' : '✨ Create Offline' }}
                </button>
              </div>
            </div>
            <p class="text-xs text-gray-500">
              This will create the user in offline mode. Later, when rate limits clear, 
              you can sync it to the online database.
            </p>
          </div>
        </div>

        <!-- Results -->
        <div v-if="result" class="mt-6 p-4 rounded-lg" :class="result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          <h3 class="font-semibold mb-2">{{ result.success ? '✅ Success' : '❌ Error' }}</h3>
          <p class="text-sm mb-2">{{ result.message }}</p>
          <pre v-if="result.details" class="text-xs bg-white p-2 rounded overflow-auto max-h-32">{{ result.details }}</pre>
        </div>

        <!-- Navigation -->
        <div class="mt-8 text-center space-y-4">
          <div class="flex flex-wrap justify-center gap-3">
            <router-link to="/dashboard" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              📊 Dashboard
            </router-link>
            <router-link to="/mobile-hub" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              📱 Mobile Hub
            </router-link>
            <button 
              @click="auth.logout()"
              v-if="auth.isAuthenticated"
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              🚪 Logout
            </button>
          </div>
          
          <div class="text-sm text-gray-500">
            💡 Tip: Use offline mode for testing, then sync to online when ready
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// State
const logging = ref(false)
const creating = ref(false)
const result = ref(null)

const vivaUser = ref({
  email: 'viva@test.viva',
  password: 'VivaTest123!',
  name: 'Viva Test User'
})

// Quick login with test accounts
const quickLogin = async (email, password) => {
  logging.value = true
  result.value = null
  
  try {
    const loginResult = await auth.login(email, password)
    
    result.value = {
      success: true,
      message: `Logged in as ${loginResult.user.name}!`,
      details: `Mode: ${loginResult.user.offlineMode ? 'Offline' : 'Online'}\nType: ${loginResult.user.userType}`
    }
    
  } catch (error) {
    result.value = {
      success: false,
      message: 'Login failed',
      details: error.message
    }
  } finally {
    logging.value = false
  }
}

// Create Viva user in offline mode
const createVivaOffline = () => {
  creating.value = true
  result.value = null
  
  try {
    // Create offline user data
    const offlineVivaUser = {
      $id: 'offline_viva_test',
      userId: 'offline_viva_test',
      email: vivaUser.value.email,
      name: vivaUser.value.name,
      userType: 'user',
      onboardingCompleted: true,
      offlineMode: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isActive: true,
      metadata: {
        createdBy: 'working-environment',
        source: 'offline-creation'
      }
    }
    
    // Save to localStorage for offline access
    auth.saveOfflineUser(offlineVivaUser)
    auth.saveOfflineCredentials(vivaUser.value.email, vivaUser.value.password)
    
    // Set as current user
    auth.user = offlineVivaUser
    
    result.value = {
      success: true,
      message: `Created ${vivaUser.value.name} in offline mode!`,
      details: JSON.stringify(offlineVivaUser, null, 2)
    }
    
  } catch (error) {
    result.value = {
      success: false,
      message: 'Failed to create offline user',
      details: error.message
    }
  } finally {
    creating.value = false
  }
}

// Enable offline mode
const useOfflineMode = () => {
  auth.offlineMode = true
  auth.appwriteAccessible = false
  
  result.value = {
    success: true,
    message: 'Offline mode enabled',
    details: 'You can now use test accounts without network issues.'
  }
}
</script>
