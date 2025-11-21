<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">👥 User Management System</h1>
          <p class="text-gray-600">Create and manage user accounts in the database</p>
        </div>

        <!-- Connection Status -->
        <div class="mb-6 p-4 rounded-lg" :class="connectionStatus.online ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div :class="[
                'w-3 h-3 rounded-full',
                connectionStatus.online ? 'bg-green-400' : 'bg-red-400'
              ]"></div>
              <span class="font-medium" :class="connectionStatus.online ? 'text-green-800' : 'text-red-800'">
                {{ connectionStatus.online ? 'Database Online' : 'Database Offline' }}
              </span>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="testConnection"
                :disabled="loading"
                class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Test Connection
              </button>
              <button 
                @click="forceOnline"
                :disabled="loading"
                class="px-3 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
              >
                Force Online
              </button>
            </div>
          </div>
          <p class="text-sm mt-1" :class="connectionStatus.online ? 'text-green-700' : 'text-red-700'">
            {{ connectionStatus.message }}
          </p>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button 
            @click="createTestUsers"
            :disabled="loading"
            class="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <div class="text-center">
              <div class="text-2xl mb-2">🚀</div>
              <div class="font-medium">Create Test Users</div>
              <div class="text-sm opacity-75">Batch create demo accounts</div>
            </div>
          </button>

          <button 
            @click="fetchAllUsers"
            :disabled="loading"
            class="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <div class="text-center">
              <div class="text-2xl mb-2">📋</div>
              <div class="font-medium">List All Users</div>
              <div class="text-sm opacity-75">View database users</div>
            </div>
          </button>

          <button 
            @click="loginAsAdmin"
            :disabled="loading"
            class="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <div class="text-center">
              <div class="text-2xl mb-2">�</div>
              <div class="font-medium">Login as Admin</div>
              <div class="text-sm opacity-75">Authenticate for database access</div>
            </div>
          </button>
        </div>

        <!-- Manual User Creation -->
        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4">➕ Create New User</h2>
          
          <form @submit.prevent="createSingleUser" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="newUser.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="user@example.com"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  v-model="newUser.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  v-model="newUser.password"
                  type="password"
                  required
                  minlength="8"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Minimum 8 characters"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                <select
                  v-model="newUser.userType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">Regular User</option>
                  <option value="fundi">Fundi Professional</option>
                  <option value="business">Business Account</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ loading ? 'Creating User...' : 'Create User Account' }}
            </button>
          </form>
        </div>

        <!-- Users List -->
        <div v-if="users.length > 0" class="bg-white border rounded-lg">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold">📊 Users in Database ({{ users.length }})</h2>
          </div>
          
          <div class="max-h-96 overflow-y-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.$id" class="hover:bg-gray-50">
                  <td class="px-4 py-3">
                    <div>
                      <div class="font-medium text-gray-900">{{ user.name }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      user.userType === 'business' ? 'bg-blue-100 text-blue-800' :
                      user.userType === 'fundi' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    ]">
                      {{ user.userType }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ user.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-500">
                    {{ formatDate(user.lastLoginAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Results/Messages -->
        <div v-if="result" class="mt-6 p-4 rounded-lg" :class="result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          <h3 class="font-semibold mb-2">{{ result.success ? '✅ Success' : '❌ Error' }}</h3>
          <div class="text-sm">
            <div v-if="result.details">{{ result.details }}</div>
            <pre v-if="result.data" class="mt-2 text-xs bg-white p-2 rounded">{{ JSON.stringify(result.data, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { account, databases, DATABASE_ID, COLLECTIONS } from '@/services/appwrite'
import { ID, Query } from 'appwrite'

const auth = useAuthStore()

const connectionStatus = ref({
  online: false,
  message: 'Checking connection...'
})

const loading = ref(false)
const users = ref([])
const result = ref(null)

const newUser = ref({
  email: '',
  name: '',
  password: '',
  userType: 'user'
})

// Test database connection
const testConnection = async () => {
  try {
    // Test both Appwrite API and database access
    const apiOnline = await auth.testAppwriteConnection()
    const dbOnline = await auth.testDatabaseConnection()
    
    const isOnline = apiOnline && dbOnline
    
    connectionStatus.value = {
      online: isOnline,
      message: isOnline 
        ? 'Database connection active and ready' 
        : 'Database connection failed - try force online mode'
    }
    return isOnline
  } catch (error) {
    connectionStatus.value = {
      online: false,
      message: `Connection error: ${error.message}`
    }
    return false
  }
}

// Force online mode
const forceOnline = () => {
  auth.forceOnlineMode()
  connectionStatus.value = {
    online: true,
    message: 'Forced online mode - database operations will be attempted'
  }
}

// Login as admin for database access
const loginAsAdmin = async () => {
  loading.value = true
  result.value = null
  
  try {
    const loginResult = await auth.login('useradmin@fundihub.com', 'Admin@123')
    
    if (loginResult.success) {
      result.value = {
        success: true,
        details: `Logged in as ${loginResult.user.name}. Database access should now be available.`
      }
      
      // Test connection after login
      await testConnection()
    } else {
      throw new Error('Login failed')
    }
  } catch (error) {
    result.value = {
      success: false,
      details: `Admin login failed: ${error.message}`
    }
  } finally {
    loading.value = false
  }
}

// Create test users
const createTestUsers = async () => {
  loading.value = true
  result.value = null
  
  const testUsers = [
    {
      email: 'john.doe@fundihub.com',
      name: 'John Doe',
      password: 'Test@123456',
      userType: 'user'
    },
    {
      email: 'jane.smith@fundihub.com',
      name: 'Jane Smith',
      password: 'Test@123456',
      userType: 'fundi'
    },
    {
      email: 'acme.corp@fundihub.com',
      name: 'ACME Corporation',
      password: 'Test@123456',
      userType: 'business'
    },
    {
      email: 'sarah.wilson@fundihub.com',
      name: 'Sarah Wilson',
      password: 'Test@123456',
      userType: 'user'
    }
  ]

  try {
    const created = []
    const failed = []

    for (const userData of testUsers) {
      try {
        const newAccount = await account.create(
          ID.unique(),
          userData.email,
          userData.password,
          userData.name
        )

        // Create user profile
        const userProfile = {
          userId: newAccount.$id,
          email: userData.email,
          name: userData.name,
          userType: userData.userType,
          onboardingCompleted: true,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          isActive: true,
          profileVersion: '1.0',
          preferences: {
            notifications: true,
            emailUpdates: true
          }
        }

        await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.USERS,
          newAccount.$id,
          userProfile
        )

        created.push(userData.email)
      } catch (error) {
        failed.push(`${userData.email}: ${error.message}`)
      }
    }

    result.value = {
      success: created.length > 0,
      details: `Created ${created.length} users, ${failed.length} failed`,
      data: { created, failed }
    }

    // Refresh user list
    await fetchAllUsers()
  } catch (error) {
    result.value = {
      success: false,
      details: `Batch creation failed: ${error.message}`
    }
  } finally {
    loading.value = false
  }
}

// Create single user
const createSingleUser = async () => {
  loading.value = true
  result.value = null

  try {
    // Create Appwrite account
    const newAccount = await account.create(
      ID.unique(),
      newUser.value.email,
      newUser.value.password,
      newUser.value.name
    )

    // Create comprehensive user profile
    const userProfile = {
      userId: newAccount.$id,
      email: newUser.value.email,
      name: newUser.value.name,
      userType: newUser.value.userType,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isActive: true,
      profileVersion: '1.0',
      preferences: {
        notifications: true,
        emailUpdates: true,
        theme: 'light'
      },
      metadata: {
        createdBy: 'admin',
        source: 'user-management'
      }
    }

    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      newAccount.$id,
      userProfile
    )

    result.value = {
      success: true,
      details: `User ${newUser.value.name} created successfully`,
      data: userProfile
    }

    // Reset form
    newUser.value = {
      email: '',
      name: '',
      password: '',
      userType: 'user'
    }

    // Refresh user list
    await fetchAllUsers()
  } catch (error) {
    console.error('❌ Create user error:', error)
    
    let errorMessage = 'User creation failed'
    if (error.code === 409) {
      errorMessage = `User with email ${newUser.value.email} already exists`
    } else if (error.code === 429) {
      errorMessage = 'Too many requests. Please wait a moment and try again.'
    } else if (error.code === 400) {
      errorMessage = 'Invalid user data. Please check your input.'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    result.value = {
      success: false,
      details: `${errorMessage} (Error ${error.code || 'Unknown'})`
    }
  } finally {
    loading.value = false
  }
}

// Fetch all users from database
const fetchAllUsers = async () => {
  loading.value = true
  result.value = null

  try {
    // Simple query without complex ordering to avoid 400 errors
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS
    )

    users.value = response.documents
    result.value = {
      success: true,
      details: `Found ${response.documents.length} users in database`
    }
  } catch (error) {
    console.error('❌ Fetch users error:', error)
    result.value = {
      success: false,
      details: `Failed to fetch users: ${error.message || error.code}`
    }
    users.value = []
  } finally {
    loading.value = false
  }
}

// Sync existing Appwrite users
const syncExistingUsers = async () => {
  loading.value = true
  result.value = null

  try {
    // This would require admin permissions to list all Appwrite users
    // For now, we'll create profiles for known accounts
    result.value = {
      success: false,
      details: 'User sync requires admin API access. Use individual user creation instead.'
    }
  } catch (error) {
    result.value = {
      success: false,
      details: `Sync failed: ${error.message}`
    }
  } finally {
    loading.value = false
  }
}

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  try {
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString()
  } catch {
    return 'Invalid date'
  }
}

onMounted(async () => {
  await testConnection()
  if (connectionStatus.value.online) {
    await fetchAllUsers()
  }
})
</script>
