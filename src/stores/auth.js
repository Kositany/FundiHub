import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  account, 
  databases, 
  DATABASE_ID, 
  COLLECTIONS, 
  handleAppwriteError, 
  testConnection,
  AppwriteException 
} from '@/services/appwrite'
import { ID, Permission, Role, Query } from 'appwrite'
import { useNotifications } from '@/composables/useNotifications'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const loading = ref(false)
  const initialized = ref(false)
  const offlineMode = ref(false)
  const appwriteAccessible = ref(true)
  
  // Notifications
  const { showSuccess, showError } = useNotifications()

  // Local storage keys
  const OFFLINE_USER_KEY = 'fundihub_offline_user'
  const OFFLINE_CREDENTIALS_KEY = 'fundihub_offline_credentials'

  // Computed
  const isAuthenticated = computed(() => {
    const authenticated = !!user.value
    console.log('🔍 isAuthenticated computed:', authenticated, user.value?.email)
    return authenticated
  })
  const userType = computed(() => {
    const type = user.value?.userType
    console.log('🔍 userType computed:', type)
    return type
  })
  const isOnboardingComplete = computed(() => {
    const complete = user.value?.onboardingComplete || user.value?.onboardingCompleted || false
    console.log('🔍 isOnboardingComplete computed:', complete, {
      onboardingComplete: user.value?.onboardingComplete,
      onboardingCompleted: user.value?.onboardingCompleted
    })
    return complete
  })

  // Actions
  const testAppwriteConnection = async () => {
    try {
      console.log('🔍 Testing Appwrite connection...')
      
      // Try multiple endpoints to ensure proper connectivity
      const testEndpoints = [
        'https://nyc.cloud.appwrite.io/v1/health',
        `https://nyc.cloud.appwrite.io/v1/projects/${import.meta.env.VITE_APPWRITE_PROJECT_ID}`
      ]
      
      for (const endpoint of testEndpoints) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout
          
          const response = await fetch(endpoint, {
            signal: controller.signal,
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'X-Appwrite-Project': import.meta.env.VITE_APPWRITE_PROJECT_ID
            }
          })
          
          clearTimeout(timeoutId)
          
          if (response.ok || response.status === 401) { // 401 means service is up but needs auth
            console.log('✅ Appwrite is accessible via', endpoint)
            appwriteAccessible.value = true
            offlineMode.value = false
            return true
          }
        } catch (endpointError) {
          console.log(`⚠️ Endpoint ${endpoint} failed:`, endpointError.message)
          continue
        }
      }
      
      throw new Error('All endpoints failed')
      
    } catch (error) {
      console.warn('⚠️ Appwrite not accessible:', error.message)
      appwriteAccessible.value = false
      offlineMode.value = true
      return false
    }
  }

  const forceOnlineMode = () => {
    console.log('🔄 Force enabling online mode...')
    appwriteAccessible.value = true
    offlineMode.value = false
    console.log('✅ Online mode enabled')
  }

  const testDatabaseConnection = async () => {
    try {
      console.log('🔍 Testing database connectivity...')
      
      // Try to list users (this tests database access)
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [Query.limit(1)]
      )
      
      console.log('✅ Database connection successful')
      appwriteAccessible.value = true
      offlineMode.value = false
      return true
      
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      
      // If it's an auth error, database is accessible but we need to login
      if (error.code === 401) {
        console.log('✅ Database accessible but needs authentication')
        appwriteAccessible.value = true
        offlineMode.value = false
        return true
      }
      
      appwriteAccessible.value = false
      offlineMode.value = true
      return false
    }
  }

  const saveOfflineCredentials = (email, password) => {
    try {
      // Simple encoding (not secure, but better than plain text)
      const credentials = btoa(`${email}:${password}`)
      localStorage.setItem(OFFLINE_CREDENTIALS_KEY, credentials)
    } catch (error) {
      console.warn('Failed to save offline credentials')
    }
  }

  const getOfflineCredentials = () => {
    try {
      const credentials = localStorage.getItem(OFFLINE_CREDENTIALS_KEY)
      if (credentials) {
        const [email, password] = atob(credentials).split(':')
        return { email, password }
      }
    } catch (error) {
      console.warn('Failed to retrieve offline credentials')
    }
    return null
  }

  const saveOfflineUser = (userData) => {
    try {
      localStorage.setItem(OFFLINE_USER_KEY, JSON.stringify(userData))
    } catch (error) {
      console.warn('Failed to save offline user data')
    }
  }

  const getOfflineUser = () => {
    try {
      const userData = localStorage.getItem(OFFLINE_USER_KEY)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.warn('Failed to retrieve offline user data')
      return null
    }
  }

  const offlineLogin = (email, password) => {
    console.log('🔄 Attempting offline login...')
    
    // Check against known test accounts
    const testAccounts = {
      'useradmin@fundihub.com': {
        password: 'Admin@123',
        user: {
          $id: 'offline_useradmin',
          userId: 'offline_useradmin',
          email: 'useradmin@fundihub.com',
          name: 'User Admin',
          userType: 'business',
          onboardingCompleted: true,
          offlineMode: true
        }
      },
      'fundiadmin@fundihub.com': {
        password: 'Admin@123',
        user: {
          $id: 'offline_fundiadmin',
          userId: 'offline_fundiadmin',
          email: 'fundiadmin@fundihub.com',
          name: 'Fundi Admin',
          userType: 'fundi',
          onboardingCompleted: true,
          offlineMode: true
        }
      },
      'test@fundihub.com': {
        password: 'Test@123',
        user: {
          $id: 'offline_testuser',
          userId: 'offline_testuser',
          email: 'test@fundihub.com',
          name: 'Test User',
          userType: 'user',
          onboardingCompleted: true,
          offlineMode: true
        }
      }
    }

    // Check saved offline credentials
    const savedCredentials = getOfflineCredentials()
    if (savedCredentials && savedCredentials.email === email && savedCredentials.password === password) {
      const savedUser = getOfflineUser()
      if (savedUser) {
        console.log('✅ Offline login with saved credentials')
        user.value = { ...savedUser, offlineMode: true }
        return { success: true, user: user.value }
      }
    }

    // Check test accounts
    const account = testAccounts[email.toLowerCase()]
    if (account && account.password === password) {
      console.log('✅ Offline login with test account')
      user.value = account.user
      saveOfflineCredentials(email, password)
      saveOfflineUser(account.user)
      return { success: true, user: user.value }
    }

    throw new Error('Invalid credentials for offline mode')
  }

  const initialize = async () => {
    if (initialized.value) return

    loading.value = true
    try {
      console.log('🔄 Initializing auth store...')
      
      // First test if Appwrite is accessible
      const appwriteOnline = await testAppwriteConnection()
      
      if (!appwriteOnline) {
        console.log('🔄 Appwrite not accessible, checking offline mode...')
        const offlineUser = getOfflineUser()
        if (offlineUser) {
          console.log('✅ Found offline user, enabling offline mode')
          user.value = { ...offlineUser, offlineMode: true }
          offlineMode.value = true
        }
        initialized.value = true
        loading.value = false
        return
      }
      
      // Test connection first
      try {
        const session = await account.get()
        console.log('✅ Active session found:', session.email)
        
        try {
          await fetchUserProfile(session.$id)
          console.log('✅ User profile loaded successfully')
        } catch (e) {
          // Fallback to minimal user so app can still function
          console.warn('⚠️ Profile fetch failed during initialize, using minimal user fallback')
          user.value = {
            $id: session.$id,
            userId: session.$id,
            email: session.email,
            name: session.name,
            userType: 'user',
            onboardingCompleted: false
          }
        }
      } catch (connError) {
        // Clear any invalid sessions
        if (connError.code === 401) {
          console.log('ℹ️ No active session found (this is normal for new users)')
          try {
            await account.deleteSession('current')
            console.log('🧹 Cleared any invalid session')
          } catch (clearError) {
            // Ignore errors when clearing sessions
          }
        } else {
          console.warn('⚠️ Connection error during auth init:', connError.message)
        }
      }
    } catch (error) {
      console.warn('⚠️ Auth initialization error (app will continue):', error.message)
      // Don't throw error - let app continue without authentication
    } finally {
      loading.value = false
      initialized.value = true
    }
  }

  const fetchUserProfile = async (userId) => {
    try {
      console.log('🔍 Fetching user profile for ID:', userId)
      
      // Get account info for email-based lookup
      const accountInfo = await account.get()
      console.log('📧 Account info:', accountInfo.email, accountInfo.$id)
      
      // Try multiple lookup strategies
      let userDoc = null
      
      // Strategy 1: Find by email (most reliable for existing users)
      try {
        console.log('🔍 Strategy 1: Looking up by email...')
        const users = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.USERS,
          [Query.equal('email', accountInfo.email)]
        )
        
        if (users.documents.length > 0) {
          userDoc = users.documents[0]
          console.log('✅ User found by email:', userDoc.name)
          
          // Update last login time
          await updateLastLoginTime(userDoc.$id)
        }
      } catch (emailSearchError) {
        console.log('⚠️ Email search failed:', emailSearchError.message)
      }
      
      // Strategy 2: Direct ID lookup
      if (!userDoc) {
        try {
          console.log('🔍 Strategy 2: Direct ID lookup...')
          userDoc = await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            userId
          )
          console.log('✅ User found by ID:', userDoc.name)
          
          // Update last login time
          await updateLastLoginTime(userDoc.$id)
        } catch (idLookupError) {
          console.log('⚠️ ID lookup failed:', idLookupError.message)
        }
      }
      
      // Strategy 3: Auto-create profile for existing Appwrite users
      if (!userDoc) {
        console.log('� Strategy 3: Auto-creating profile for existing user...')
        userDoc = await autoCreateUserProfile(accountInfo)
      }
      
      if (userDoc) {
        user.value = userDoc
        
        // Save for offline access
        saveOfflineCredentials(accountInfo.email, 'cached')
        saveOfflineUser(userDoc)
        
        console.log('✅ User profile loaded successfully')
        return userDoc
      }
      
      throw new Error('Failed to fetch or create user profile')
      
    } catch (error) {
      console.error('❌ Error in fetchUserProfile:', error)
      
      // Fallback strategy: Create minimal profile
      try {
        const accountInfo = await account.get()
        console.log('🔄 Using fallback profile creation...')
        
        const fallbackUser = {
          $id: accountInfo.$id,
          userId: accountInfo.$id,
          email: accountInfo.email,
          name: accountInfo.name,
          userType: detectUserTypeFromEmail(accountInfo.email),
          onboardingCompleted: false,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          isActive: true,
          fallbackProfile: true
        }
        
        user.value = fallbackUser
        
        // Try to save this fallback profile to database
        try {
          await createComprehensiveUserProfile(accountInfo, fallbackUser.userType)
        } catch (saveError) {
          console.warn('⚠️ Could not save fallback profile to database')
        }
        
        return fallbackUser
      } catch (fallbackError) {
        console.error('❌ Fallback profile creation failed:', fallbackError)
        throw error
      }
    }
  }

  const detectUserTypeFromEmail = (email) => {
    if (!email) return 'user'
    
    const emailLower = email.toLowerCase()
    if (emailLower.includes('business') || emailLower.includes('admin')) {
      return 'business'
    } else if (emailLower.includes('fundi')) {
      return 'fundi'
    }
    return 'user'
  }

  const updateLastLoginTime = async (userId) => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId,
        {
          lastLoginAt: new Date().toISOString()
        }
      )
      console.log('✅ Updated last login time')
    } catch (error) {
      console.warn('⚠️ Could not update last login time:', error.message)
    }
  }

  const autoCreateUserProfile = async (accountInfo) => {
    try {
      console.log('🤖 Auto-creating profile for existing Appwrite user...')
      
      const detectedUserType = detectUserTypeFromEmail(accountInfo.email)
      
      const autoProfile = {
        userId: accountInfo.$id,
        email: accountInfo.email,
        name: accountInfo.name || 'User',
        userType: detectedUserType,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        profileVersion: '1.0',
        isActive: true,
        autoCreated: true,
        preferences: {
          notifications: true,
          emailUpdates: true,
          theme: 'light'
        },
        metadata: {
          source: 'auto-migration',
          deviceInfo: navigator.userAgent.substring(0, 100),
          createdBy: 'system'
        }
      }

      console.log('📄 Auto-profile data:', autoProfile)

      // Try creating the profile
      const userDoc = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        accountInfo.$id,
        autoProfile
      )
      
      console.log('✅ Auto-created profile successfully:', userDoc.$id)
      return userDoc
      
    } catch (error) {
      console.error('❌ Auto-profile creation failed:', error)
      throw error
    }
  }

  const createUserProfile = async (accountInfo) => {
    try {
      console.log('📝 Creating user profile for:', accountInfo.email)
      
      // Detect user type based on email or name
      let detectedUserType = 'user' // Default
      if (accountInfo.email && (
        accountInfo.email.includes('business') || 
        accountInfo.email.includes('admin') ||
        (accountInfo.name && accountInfo.name.toLowerCase().includes('business'))
      )) {
        detectedUserType = 'business'
      } else if (accountInfo.email && accountInfo.email.includes('fundi')) {
        detectedUserType = 'fundi'
      }
      
      const userProfile = {
        userId: accountInfo.$id,
        email: accountInfo.email,
        name: accountInfo.name,
        userType: detectedUserType,
        onboardingCompleted: false,
        createdAt: new Date().toISOString()
      }
      console.log('Profile data:', userProfile)

      // Try to create document without specific permissions first
      try {
        const userDoc = await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.USERS,
          accountInfo.$id,
          userProfile
        )
        console.log('✅ Profile created with ID:', userDoc.$id)
        user.value = userDoc
        return
      } catch (permissionError) {
        console.warn('⚠️ Permission error, trying with default permissions:', permissionError.message)
        
        // Try with basic permissions
        const permissions = [
          Permission.read(Role.user(accountInfo.$id)),
          Permission.update(Role.user(accountInfo.$id)),
          Permission.delete(Role.user(accountInfo.$id))
        ]

        const userDoc = await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.USERS,
          accountInfo.$id,
          userProfile,
          permissions
        )
        console.log('✅ Profile created with permissions:', userDoc.$id)
        user.value = userDoc
      }
    } catch (error) {
      console.error('❌ Error creating user profile:', error)
      console.error('Error details:', error.message)
      
      // If we still can't create, use the fallback approach
      console.log('ℹ️ Using fallback user profile approach')
      
      // Detect user type for fallback too
      let fallbackUserType = 'user'
      if (accountInfo.email && (
        accountInfo.email.includes('business') || 
        accountInfo.email.includes('admin') ||
        (accountInfo.name && accountInfo.name.toLowerCase().includes('business'))
      )) {
        fallbackUserType = 'business'
      } else if (accountInfo.email && accountInfo.email.includes('fundi')) {
        fallbackUserType = 'fundi'
      }
      
      user.value = {
        $id: accountInfo.$id,
        userId: accountInfo.$id,
        email: accountInfo.email,
        name: accountInfo.name,
        userType: fallbackUserType,
        onboardingCompleted: false,
        createdAt: new Date().toISOString()
      }
    }
  }

  const register = async (email, password, name, userType = 'user') => {
    loading.value = true
    try {
      console.log('🚀 Starting registration process...')
      console.log('📧 Email:', email)
      console.log('👤 Name:', name)
      console.log('🔧 User Type:', userType)

      // Test Appwrite connectivity first
      const appwriteOnline = await testAppwriteConnection()
      
      if (!appwriteOnline) {
        throw new Error('Cannot register new users in offline mode. Please check your internet connection and try again.')
      }

      // Clear any existing session first
      try {
        await account.deleteSession('current')
        console.log('✅ Cleared existing session before registration')
      } catch (error) {
        console.log('ℹ️ No existing session to clear')
      }
      
      // Create account
      console.log('📝 Creating Appwrite account...')
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      )
      console.log('✅ Account created successfully:', newAccount.$id)

      // Login automatically after registration
      console.log('🔐 Creating login session...')
      await account.createEmailPasswordSession(email, password)
      console.log('✅ Login session created')

      // Create comprehensive user profile with retries
      console.log('👤 Creating comprehensive user profile...')
      await createComprehensiveUserProfile(newAccount, userType)

      // Save for offline access
      saveOfflineCredentials(email, password)
      saveOfflineUser(user.value)

      // Show success notification
      showSuccess(
        'Account Created Successfully!',
        `Welcome to FundiHub, ${name}! Your account has been created and you are now logged in.`
      )

      return { success: true, user: user.value }
    } catch (error) {
      console.error('❌ Registration error:', error)
      
      let errorMessage = 'Failed to create account. Please try again.'
      
      if (error.message.includes('offline mode')) {
        errorMessage = error.message
      } else if (error.message && (error.message.includes('fetch') || error.message.includes('load'))) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.'
      } else if (error.code === 409) {
        errorMessage = 'An account with this email already exists. Please try logging in instead.'
      } else if (error.code === 400) {
        errorMessage = 'Invalid information provided. Please check your details and try again.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  const createComprehensiveUserProfile = async (accountInfo, userType = 'user') => {
    const maxRetries = 3
    let attempt = 0

    while (attempt < maxRetries) {
      try {
        console.log(`📝 Creating user profile (attempt ${attempt + 1}/${maxRetries})`)
        
        // Detect user type based on email if not specified
        let detectedUserType = userType
        if (accountInfo.email && !userType) {
          if (accountInfo.email.includes('business') || 
              accountInfo.email.includes('admin') ||
              (accountInfo.name && accountInfo.name.toLowerCase().includes('business'))) {
            detectedUserType = 'business'
          } else if (accountInfo.email.includes('fundi')) {
            detectedUserType = 'fundi'
          }
        }
        
        const userProfile = {
          userId: accountInfo.$id,
          email: accountInfo.email,
          name: accountInfo.name,
          userType: detectedUserType,
          onboardingCompleted: false,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          profileVersion: '1.0',
          isActive: true,
          preferences: {
            notifications: true,
            emailUpdates: true,
            theme: 'light'
          },
          metadata: {
            registrationSource: 'web',
            deviceInfo: navigator.userAgent.substring(0, 100),
            ipInfo: 'pending'
          }
        }

        console.log('📄 Profile data:', userProfile)

        // Try creating with automatic permissions
        try {
          const userDoc = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            accountInfo.$id,
            userProfile
          )
          console.log('✅ Profile created successfully:', userDoc.$id)
          user.value = userDoc
          return userDoc
        } catch (permissionError) {
          console.warn('⚠️ Permission error, trying with explicit permissions...')
          
          // Try with explicit permissions
          const permissions = [
            Permission.read(Role.user(accountInfo.$id)),
            Permission.update(Role.user(accountInfo.$id)),
            Permission.delete(Role.user(accountInfo.$id)),
            Permission.read(Role.any()) // Allow reading for admin purposes
          ]

          const userDoc = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            accountInfo.$id,
            userProfile,
            permissions
          )
          console.log('✅ Profile created with explicit permissions:', userDoc.$id)
          user.value = userDoc
          return userDoc
        }
      } catch (error) {
        attempt++
        console.error(`❌ Profile creation attempt ${attempt} failed:`, error.message)
        
        if (attempt >= maxRetries) {
          console.warn('⚠️ All profile creation attempts failed, using fallback')
          
          // Fallback user profile
          user.value = {
            $id: accountInfo.$id,
            userId: accountInfo.$id,
            email: accountInfo.email,
            name: accountInfo.name,
            userType: userType,
            onboardingCompleted: false,
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            isActive: true,
            fallbackProfile: true
          }
          return user.value
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
      }
    }
  }

  const login = async (email, password) => {
    loading.value = true
    try {
      console.log('🔍 Starting login process for:', email)
      
      // First test if Appwrite is accessible
      const appwriteOnline = await testAppwriteConnection()
      
      if (!appwriteOnline) {
        console.log('🔄 Appwrite not accessible, trying offline login...')
        const result = offlineLogin(email, password)
        
        showSuccess(
          'Welcome Back! (Offline Mode)',
          `Hello ${result.user.name}, you are logged in offline. Some features may be limited.`
        )
        
        return result
      }
      
      // Clear any existing session
      try {
        const existingSession = await account.get()
        console.log('Found existing session, logging out first...')
        await account.deleteSession('current')
      } catch (error) {
        console.log('No existing session found')
      }
      
      // Create session with timeout
      console.log('🔐 Creating email password session...')
      const createSessionWithTimeout = () => {
        return Promise.race([
          account.createEmailPasswordSession(email, password),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout - check your network connection')), 15000)
          )
        ])
      }
      
      await createSessionWithTimeout()
      
      console.log('✅ Session created, getting account info...')
      const session = await account.get()
      console.log('Account info:', session.email, session.$id)
      
      // Fetch or create user profile with enhanced logic
      console.log('👤 Fetching/creating user profile...')
      try {
        await fetchUserProfile(session.$id)
      } catch (e) {
        console.warn('Profile fetch failed, creating comprehensive fallback...')
        
        // Enhanced fallback with comprehensive user creation
        const fallbackUserType = detectUserTypeFromEmail(session.email)
        
        user.value = {
          $id: session.$id,
          userId: session.$id,
          email: session.email,
          name: session.name,
          userType: fallbackUserType,
          onboardingCompleted: false,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          isActive: true,
          fallbackProfile: true
        }

        // Try to create profile in database asynchronously
        setTimeout(async () => {
          try {
            await autoCreateUserProfile(session)
            console.log('✅ Async profile creation successful')
          } catch (asyncError) {
            console.warn('⚠️ Async profile creation failed')
          }
        }, 1000)
      }
      
      console.log('✅ Login successful for user:', user.value?.name)
      
      // Save for offline mode and future sessions
      saveOfflineCredentials(email, password)
      saveOfflineUser(user.value)
      
      // Show success notification
      showSuccess(
        'Welcome Back!',
        `Hello ${user.value?.name}, you have successfully logged in.`
      )
      
      return { success: true, user: user.value }
    } catch (error) {
      console.error('❌ Login error details:', error)
      
      // Enhanced fallback for login failures
      if (!offlineMode.value) {
        console.log('🔄 Online login failed, trying offline fallback...')
        try {
          const result = offlineLogin(email, password)
          showSuccess(
            'Welcome Back! (Offline Mode)',
            `Hello ${result.user.name}, logged in offline due to connection issues.`
          )
          return result
        } catch (offlineError) {
          console.log('❌ Offline login also failed')
        }
      }
      
      // User-friendly error messages
      let errorMessage = 'Login failed. Please try again.'
      
      if (error.message === 'Load failed' || error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. For offline testing use: useradmin@fundihub.com / Admin@123'
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Connection timeout. Trying offline mode with test accounts...'
      } else if (error.code === 401) {
        errorMessage = 'Invalid credentials. For offline testing use: useradmin@fundihub.com / Admin@123'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      // Clear offline data
      localStorage.removeItem(OFFLINE_USER_KEY)
      localStorage.removeItem(OFFLINE_CREDENTIALS_KEY)
      
      if (!offlineMode.value && appwriteAccessible.value) {
        await account.deleteSession('current')
      }
      
      user.value = null
      offlineMode.value = false
      
      // Show success notification for logout
      showSuccess(
        'Logged Out Successfully',
        'You have been logged out. Thank you for using FundiHub!'
      )
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, clear local state
      user.value = null
      offlineMode.value = false
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (updates) => {
    loading.value = true
    try {
      // Only include updates for attributes that exist in the collection
      const allowedUpdates = {}
      const allowedFields = ['userId', 'email', 'name', 'userType', 'onboardingCompleted', 'createdAt']
      
      for (const [key, value] of Object.entries(updates)) {
        if (allowedFields.includes(key)) {
          allowedUpdates[key] = value
        }
      }

      const updatedUser = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        user.value.$id,
        allowedUpdates
      )
      user.value = updatedUser
      return updatedUser
    } catch (error) {
      console.error('Profile update error:', error)
      throw new Error(handleAppwriteError(error))
    } finally {
      loading.value = false
    }
  }

  const completeOnboarding = async (onboardingData) => {
    loading.value = true
    try {
      console.log('🚀 Starting onboarding completion for:', onboardingData.userType)
      console.log('📝 Onboarding data:', onboardingData)
      console.log('👤 Current user:', user.value)
      
      // Only include updates for attributes that exist in the collection
      const allowedUpdates = {}
      const allowedFields = ['userId', 'email', 'name', 'userType', 'onboardingCompleted', 'createdAt']
      
      for (const [key, value] of Object.entries(onboardingData)) {
        if (allowedFields.includes(key)) {
          allowedUpdates[key] = value
        }
      }
      
      allowedUpdates.onboardingCompleted = true  // Use the correct field name
      console.log('✅ Prepared updates:', allowedUpdates)

      // If user is upgrading to fundi or business, create additional profile
      if (onboardingData.userType === 'fundi') {
        console.log('👷 Creating fundi profile...')
        await createFundiProfile(onboardingData)
      } else if (onboardingData.userType === 'business') {
        console.log('🏢 Creating business profile...')
        await createBusinessProfile(onboardingData)
      }

      console.log('📄 Updating user document...')
      console.log('Database ID:', DATABASE_ID)
      console.log('Collection ID:', COLLECTIONS.USERS)
      console.log('User ID:', user.value.$id)
      
      const updatedUser = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        user.value.$id,
        allowedUpdates
      )
      
      console.log('✅ User document updated successfully:', updatedUser)
      user.value = updatedUser
      
      // Show success notification for onboarding completion
      const userTypeText = onboardingData.userType === 'fundi' ? 'Fundi' : 
                          onboardingData.userType === 'business' ? 'Business' : 'User'
      showSuccess(
        'Onboarding Complete!',
        `Welcome to FundiHub! Your ${userTypeText.toLowerCase()} profile has been set up successfully.`
      )
      
      return updatedUser
    } catch (error) {
      console.error('❌ Onboarding completion error:', error)
      console.error('Error details:', {
        code: error.code,
        type: error.type,
        message: error.message,
        response: error.response
      })
      
      // Provide a more user-friendly error message based on the error type
      let userMessage = 'Failed to complete setup. Please try again.'
      
      if (error.code === 404) {
        userMessage = 'User profile not found. Please try logging in again.'
      } else if (error.code === 401) {
        userMessage = 'Session expired. Please log in again.'
      } else if (error.message && error.message.includes('network')) {
        userMessage = 'Connection error. Please check your internet and try again.'
      }
      
      throw new Error(userMessage)
    } finally {
      loading.value = false
    }
  }

  const createFundiProfile = async (fundiData) => {
    try {
      const fundiProfile = {
        userId: user.value.$id,
        name: fundiData.name || user.value.name,
        specialization: fundiData.specialization,
        skills: fundiData.skills || [],
        experience: fundiData.experience || 0,
        location: fundiData.location || '',
        description: fundiData.description || '',
        hourlyRate: fundiData.hourlyRate || 0,
        available: true,
        verified: false,
        rating: 0,
        totalJobs: 0,
        completedJobs: 0,
        certifications: fundiData.certifications || [],
        portfolio: [],
        organizationType: fundiData.organizationType || 'individual', // individual or organization
        teamSize: fundiData.teamSize || 1,
        createdAt: new Date().toISOString()
      }

      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.FUNDIS,
        user.value.$id,
        fundiProfile
      )
    } catch (error) {
      console.error('Error creating fundi profile:', error)
      throw error
    }
  }

  const createBusinessProfile = async (businessData) => {
    try {
      const businessProfile = {
        userId: user.value.$id,
        businessName: businessData.businessName,
        businessType: businessData.businessType,
        industry: businessData.industry,
        size: businessData.size,
        location: businessData.location || '',
        description: businessData.description || '',
        website: businessData.website || '',
        registrationNumber: businessData.registrationNumber || '',
        verified: false,
        totalProjects: 0,
        activeProjects: 0,
        createdAt: new Date().toISOString()
      }

      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.BUSINESSES,
        user.value.$id,
        businessProfile
      )
    } catch (error) {
      console.error('Error creating business profile:', error)
      throw error
    }
  }

  const sendPasswordRecovery = async (email) => {
    loading.value = true
    try {
      await account.createPasswordRecovery(
        email,
        `${window.location.origin}/reset-password`
      )
      return { success: true }
    } catch (error) {
      console.error('Password recovery error:', error)
      throw new Error(handleAppwriteError(error))
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (userId, secret, password) => {
    loading.value = true
    try {
      await account.updatePasswordRecovery(userId, secret, password)
      return { success: true }
    } catch (error) {
      console.error('Password reset error:', error)
      throw new Error(handleAppwriteError(error))
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    user,
    loading,
    initialized,
    offlineMode,
    appwriteAccessible,
    
    // Computed
    isAuthenticated,
    userType,
    isOnboardingComplete,
    
    // Actions
    initialize,
    register,
    login,
    logout,
    updateProfile,
    completeOnboarding,
    sendPasswordRecovery,
    resetPassword,
    fetchUserProfile,
    testAppwriteConnection,
    offlineLogin,
    saveOfflineUser,
    getOfflineUser,
    
    // Enhanced user management
    createComprehensiveUserProfile,
    autoCreateUserProfile,
    detectUserTypeFromEmail,
    updateLastLoginTime,
    
    // Online mode controls
    forceOnlineMode,
    testDatabaseConnection
  }
})
