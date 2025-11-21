import { account } from '@/services/appwrite'
import { ID } from 'appwrite'

// Simple registration function that only creates the account
export const simpleRegister = async (email, password, name) => {
  try {
    console.log('🚀 Starting simple registration...')
    console.log('📧 Email:', email)
    console.log('👤 Name:', name)

    // Clear any existing session
    try {
      await account.deleteSession('current')
      console.log('✅ Cleared existing session')
    } catch (error) {
      console.log('ℹ️ No existing session to clear')
    }

    // Create account
    console.log('📝 Creating account...')
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    )
    console.log('✅ Account created:', newAccount.$id)

    // Create session
    console.log('🔐 Creating session...')
    const session = await account.createEmailPasswordSession(email, password)
    console.log('✅ Session created:', session.$id)

    // Get user info
    const user = await account.get()
    console.log('✅ User info retrieved:', user.name)

    return {
      success: true,
      user: {
        $id: user.$id,
        name: user.name,
        email: user.email,
        userType: 'user', // default
        onboardingComplete: false
      }
    }
  } catch (error) {
    console.error('❌ Simple registration failed:', error)
    
    let errorMessage = 'Failed to create account. Please try again.'
    
    if (error.message && error.message.includes('fetch')) {
      errorMessage = 'Unable to connect to the server. Please check your internet connection.'
    } else if (error.code === 409) {
      errorMessage = 'An account with this email already exists. Please try logging in instead.'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    throw new Error(errorMessage)
  }
}

// Simple login function
export const simpleLogin = async (email, password) => {
  try {
    console.log('🔐 Starting simple login...')
    
    // Clear existing session
    try {
      await account.deleteSession('current')
    } catch (error) {
      console.log('ℹ️ No existing session to clear')
    }

    // Create session
    const session = await account.createEmailPasswordSession(email, password)
    console.log('✅ Session created:', session.$id)

    // Get user info
    const user = await account.get()
    console.log('✅ Login successful:', user.name)

    return {
      success: true,
      user: {
        $id: user.$id,
        name: user.name,
        email: user.email,
        userType: 'user',
        onboardingComplete: false
      }
    }
  } catch (error) {
    console.error('❌ Simple login failed:', error)
    
    let errorMessage = 'Failed to login. Please check your credentials.'
    
    if (error.message && error.message.includes('fetch')) {
      errorMessage = 'Unable to connect to the server. Please check your internet connection.'
    } else if (error.code === 401) {
      errorMessage = 'Invalid email or password. Please try again.'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    throw new Error(errorMessage)
  }
}
