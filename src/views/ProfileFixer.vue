<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">User Profile Fixer</h1>
        
        <!-- Current Session Info -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Current Session</h2>
          <div v-if="currentSession">
            <div class="space-y-2 text-sm">
              <div><strong>User ID:</strong> {{ currentSession.userId }}</div>
              <div><strong>Email:</strong> {{ currentSession.email }}</div>
              <div><strong>Name:</strong> {{ currentSession.name }}</div>
              <div><strong>Detected Type:</strong> 
                <span :class="detectedType === 'business' ? 'text-purple-600' : detectedType === 'fundi' ? 'text-green-600' : 'text-blue-600'" class="font-medium">
                  {{ detectedType }}
                </span>
              </div>
            </div>
            
            <div class="mt-4 space-x-3">
              <button 
                @click="createUserProfile"
                :disabled="fixing"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {{ fixing ? 'Creating...' : 'Create User Profile' }}
              </button>
              
              <button 
                @click="updateUserType"
                :disabled="fixing"
                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {{ fixing ? 'Updating...' : 'Update User Type' }}
              </button>
              
              <button 
                @click="checkUserProfile"
                :disabled="checking"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {{ checking ? 'Checking...' : 'Check Profile' }}
              </button>
            </div>
          </div>
          <div v-else class="text-gray-500 dark:text-gray-400">
            No active session found
          </div>
        </div>

        <!-- User Profile Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Profile Status</h2>
          <div v-if="profileStatus">
            <div class="flex items-center mb-3">
              <span :class="profileStatus.exists ? 'text-green-600' : 'text-red-600'" class="font-medium">
                {{ profileStatus.exists ? '✅ Profile exists' : '❌ Profile missing' }}
              </span>
            </div>
            <div v-if="profileStatus.exists && profileStatus.data" class="space-y-2 text-sm">
              <div><strong>Profile ID:</strong> {{ profileStatus.data.$id }}</div>
              <div><strong>User Type:</strong> {{ profileStatus.data.userType }}</div>
              <div><strong>Onboarding:</strong> {{ profileStatus.data.onboardingCompleted ? 'Complete' : 'Pending' }}</div>
              <div><strong>Created:</strong> {{ formatDate(profileStatus.data.createdAt) }}</div>
            </div>
          </div>
        </div>

        <!-- Action Results -->
        <div v-if="actionResults.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 class="text-xl font-semibold mb-4">Action Results</h2>
          <div class="space-y-2">
            <div v-for="result in actionResults" :key="result.id" class="text-sm">
              <span :class="result.success ? 'text-green-600' : 'text-red-600'">
                {{ result.success ? '✅' : '❌' }} {{ result.action }}: {{ result.message }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { account, databases, DATABASE_ID, COLLECTIONS } from '@/services/appwrite'
import { useNotifications } from '@/composables/useNotifications'

const { showSuccess, showError } = useNotifications()

// Reactive state
const currentSession = ref(null)
const profileStatus = ref(null)
const fixing = ref(false)
const checking = ref(false)
const actionResults = ref([])

// Computed
const detectedType = computed(() => {
  if (!currentSession.value) return 'user'
  
  const email = currentSession.value.email
  const name = currentSession.value.name
  
  if (email && (
    email.includes('business') || 
    email.includes('admin') ||
    (name && name.toLowerCase().includes('business'))
  )) {
    return 'business'
  } else if (email && email.includes('fundi')) {
    return 'fundi'
  }
  
  return 'user'
})

// Methods
const addResult = (action, success, message) => {
  actionResults.value.unshift({
    id: Date.now(),
    action,
    success,
    message
  })
}

const getCurrentSession = async () => {
  try {
    const session = await account.get()
    currentSession.value = {
      userId: session.$id,
      email: session.email,
      name: session.name
    }
    addResult('Get Session', true, 'Successfully retrieved current session')
  } catch (error) {
    addResult('Get Session', false, `Failed: ${error.message}`)
    console.error('Session error:', error)
  }
}

const checkUserProfile = async () => {
  if (!currentSession.value) {
    showError('Error', 'No active session found')
    return
  }
  
  checking.value = true
  try {
    const userDoc = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      currentSession.value.userId
    )
    
    profileStatus.value = {
      exists: true,
      data: userDoc
    }
    
    addResult('Check Profile', true, 'Profile found in database')
    showSuccess('Profile Check', 'User profile exists in database')
  } catch (error) {
    profileStatus.value = {
      exists: false,
      data: null
    }
    
    addResult('Check Profile', false, `Profile not found: ${error.message}`)
    showError('Profile Check', 'User profile not found in database')
  } finally {
    checking.value = false
  }
}

const createUserProfile = async () => {
  if (!currentSession.value) {
    showError('Error', 'No active session found')
    return
  }
  
  fixing.value = true
  try {
    const userProfile = {
      userId: currentSession.value.userId,
      email: currentSession.value.email,
      name: currentSession.value.name,
      userType: detectedType.value,
      onboardingCompleted: false,
      createdAt: new Date().toISOString()
    }
    
    // Try without permissions first
    try {
      const userDoc = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        currentSession.value.userId,
        userProfile
      )
      
      profileStatus.value = {
        exists: true,
        data: userDoc
      }
      
      addResult('Create Profile', true, 'Profile created successfully')
      showSuccess('Profile Created', `Created ${detectedType.value} profile successfully!`)
    } catch (permError) {
      // If permission error, the user might already exist or have permission issues
      addResult('Create Profile', false, `Permission error: ${permError.message}`)
      showError('Profile Creation', `Permission error: ${permError.message}`)
    }
  } catch (error) {
    addResult('Create Profile', false, `Error: ${error.message}`)
    showError('Profile Creation', `Failed: ${error.message}`)
  } finally {
    fixing.value = false
  }
}

const updateUserType = async () => {
  if (!currentSession.value) {
    showError('Error', 'No active session found')
    return
  }
  
  fixing.value = true
  try {
    // First check if profile exists
    let existingProfile
    try {
      existingProfile = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        currentSession.value.userId
      )
    } catch (error) {
      addResult('Update Type', false, 'Profile does not exist - create it first')
      showError('Update Failed', 'Profile does not exist. Create it first.')
      fixing.value = false
      return
    }
    
    // Update the user type
    const updatedProfile = await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      currentSession.value.userId,
      {
        userType: detectedType.value
      }
    )
    
    profileStatus.value = {
      exists: true,
      data: updatedProfile
    }
    
    addResult('Update Type', true, `Updated user type to ${detectedType.value}`)
    showSuccess('Profile Updated', `User type updated to ${detectedType.value}!`)
  } catch (error) {
    addResult('Update Type', false, `Error: ${error.message}`)
    showError('Update Failed', `Failed: ${error.message}`)
  } finally {
    fixing.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Initialize
onMounted(async () => {
  await getCurrentSession()
  if (currentSession.value) {
    await checkUserProfile()
  }
})
</script>
