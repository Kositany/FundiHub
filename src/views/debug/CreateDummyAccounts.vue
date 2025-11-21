<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div class="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Dummy Accounts</h1>
        <p class="text-gray-600 dark:text-gray-400">Generate test accounts for all user types</p>
      </div>

      <div class="space-y-4">
        <!-- Progress -->
        <div v-if="isCreating" class="p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-blue-700 dark:text-blue-300">{{ currentStep }}</span>
          </div>
        </div>

        <!-- Results -->
        <div v-if="results.length > 0" class="space-y-2">
          <h3 class="font-medium text-gray-900 dark:text-white">Created Accounts:</h3>
          <div v-for="result in results" :key="result.email" class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex justify-between items-center">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">{{ result.name }} ({{ result.userType }})</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ result.email }}</div>
              </div>
              <div :class="result.success ? 'text-green-600' : 'text-red-600'">
                {{ result.success ? '✅' : '❌' }}
              </div>
            </div>
            <div v-if="result.success" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Password: password123
            </div>
            <div v-if="!result.success" class="mt-2 text-xs text-red-600">
              {{ result.error }}
            </div>
          </div>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
          <div class="text-red-700 dark:text-red-300">{{ error }}</div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            @click="createDummyAccounts"
            :disabled="isCreating"
            class="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ isCreating ? 'Creating...' : 'Create Dummy Accounts' }}
          </button>

          <router-link
            to="/"
            class="block w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-center transition-colors"
          >
            Back to Home
          </router-link>
        </div>

        <!-- Login Information -->
        <div v-if="results.length > 0" class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <h3 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Login Credentials:</h3>
          <div class="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
            <div><strong>Regular User:</strong> user@fundihub.com / password123</div>
            <div><strong>Fundi:</strong> fundi@fundihub.com / password123</div>
            <div><strong>Business:</strong> business@fundihub.com / password123</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { account, databases, DATABASE_ID } from '@/services/appwrite'
import { ID } from 'appwrite'
import { useToast } from 'vue-toastification'

const toast = useToast()

// State
const isCreating = ref(false)
const currentStep = ref('')
const results = ref([])
const error = ref('')

const dummyAccounts = [
  {
    email: 'user@fundihub.com',
    password: 'password123',
    name: 'John Doe',
    userType: 'user'
  },
  {
    email: 'fundi@fundihub.com', 
    password: 'password123',
    name: 'Mike Builder',
    userType: 'fundi'
  },
  {
    email: 'business@fundihub.com',
    password: 'password123',
    name: 'ABC Construction',
    userType: 'business'
  }
]

const createDummyAccounts = async () => {
  isCreating.value = true
  results.value = []
  error.value = ''

  try {
    for (const accountData of dummyAccounts) {
      currentStep.value = `Creating ${accountData.userType} account: ${accountData.email}`
      
      try {
        // Create authentication account
        const userId = ID.unique()
        await account.create(userId, accountData.email, accountData.password, accountData.name)
        
        // Wait a moment for account creation
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Create user profile in database
        await databases.createDocument(
          DATABASE_ID,
          'users',
          userId,
          {
            email: accountData.email,
            name: accountData.name,
            userType: accountData.userType,
            isVerified: true,
            onboardingCompleted: true
          }
        )

        // Create additional profiles based on user type
        if (accountData.userType === 'fundi') {
          await databases.createDocument(
            DATABASE_ID,
            'fundis',
            ID.unique(),
            {
              userId: userId,
              specialization: ['construction', 'plumbing'],
              experience: 5,
              rating: 4.5
            }
          )
        } else if (accountData.userType === 'business') {
          await databases.createDocument(
            DATABASE_ID,
            'businesses',
            ID.unique(),
            {
              userId: userId,
              businessName: `${accountData.name} Ltd`,
              businessType: 'construction'
            }
          )
        }

        results.value.push({
          ...accountData,
          success: true,
          userId: userId
        })

        toast.success(`${accountData.userType} account created successfully`)

      } catch (error) {
        console.error(`Error creating ${accountData.userType}:`, error)
        
        let errorMessage = error.message
        if (error.code === 409) {
          errorMessage = 'Account already exists'
        }
        
        results.value.push({
          ...accountData,
          success: false,
          error: errorMessage
        })
      }
    }

    // Create some sample projects
    currentStep.value = 'Creating sample projects...'
    await createSampleProjects()

  } catch (err) {
    console.error('Error in dummy account creation:', err)
    error.value = err.message
  } finally {
    isCreating.value = false
    currentStep.value = ''
  }
}

const createSampleProjects = async () => {
  const sampleProjects = [
    {
      title: 'Kitchen Renovation',
      description: 'Complete kitchen renovation including cabinets, countertops, and plumbing',
      clientId: results.value.find(r => r.userType === 'user')?.userId || 'user_001',
      status: 'open'
    },
    {
      title: 'Office Building Construction', 
      description: 'New 3-story office building construction project',
      clientId: results.value.find(r => r.userType === 'business')?.userId || 'business_001',
      status: 'open'
    }
  ]

  for (const project of sampleProjects) {
    try {
      await databases.createDocument(
        DATABASE_ID,
        'projects',
        ID.unique(),
        project
      )
    } catch (error) {
      console.error('Error creating sample project:', error)
    }
  }
}
</script>
