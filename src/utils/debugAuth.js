// Debug Authentication Utility
import { useAuthStore } from '@/stores/auth'
import { account, databases, DATABASE_ID, COLLECTIONS } from '@/services/appwrite'

export const debugAuthState = async () => {
  console.log('=== AUTHENTICATION DEBUG ===')
  
  try {
    // Check current session
    const session = await account.get()
    console.log('✅ Active session found:', {
      userId: session.$id,
      email: session.email,
      name: session.name
    })
    
    // Check user document in database
    try {
      const userDoc = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        session.$id
      )
      console.log('✅ User document found:', {
        userType: userDoc.userType,
        onboardingCompleted: userDoc.onboardingCompleted,
        name: userDoc.name
      })
      
      if (!userDoc.onboardingCompleted) {
        console.log('❌ ISSUE FOUND: Onboarding not completed!')
        console.log('Solution: Complete onboarding or manually update user document')
        return {
          issue: 'onboarding_incomplete',
          userDoc,
          session
        }
      } else {
        console.log('✅ Onboarding completed - dashboard should be accessible')
        return {
          issue: null,
          userDoc,
          session
        }
      }
    } catch (dbError) {
      console.log('❌ User document not found in database')
      console.log('Solution: Create user document or complete registration')
      return {
        issue: 'user_document_missing',
        session,
        dbError
      }
    }
  } catch (sessionError) {
    console.log('❌ No active session found')
    console.log('Solution: Login required')
    return {
      issue: 'no_session',
      sessionError
    }
  }
}

export const forceCompleteOnboarding = async (userType = 'user') => {
  try {
    const session = await account.get()
    console.log('🔧 Force completing onboarding for:', session.email)
    
    const updateData = {
      userType: userType,
      onboardingCompleted: true
    }
    
    const updatedUser = await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      session.$id,
      updateData
    )
    
    console.log('✅ Onboarding force completed!')
    console.log('User can now access dashboard at:', `/dashboard/${userType}`)
    
    // Update auth store
    const authStore = useAuthStore()
    await authStore.fetchUserProfile(session.$id)
    
    return updatedUser
  } catch (error) {
    console.error('❌ Failed to force complete onboarding:', error)
    throw error
  }
}

export const fixUserType = async (correctUserType) => {
  try {
    const session = await account.get()
    console.log('🔧 Fixing user type for:', session.email, 'to:', correctUserType)
    
    const updateData = {
      userType: correctUserType,
      onboardingCompleted: true
    }
    
    const updatedUser = await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      session.$id,
      updateData
    )
    
    console.log('✅ User type fixed!')
    console.log('User can now access dashboard at:', `/dashboard/${correctUserType}`)
    
    // Update auth store
    const authStore = useAuthStore()
    await authStore.fetchUserProfile(session.$id)
    
    return updatedUser
  } catch (error) {
    console.error('❌ Failed to fix user type:', error)
    throw error
  }
}

// Quick debug function to add to window for console access
export const setupDebugGlobals = () => {
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    window.debugAuth = {
      check: debugAuthState,
      completeOnboarding: forceCompleteOnboarding,
      completeAsUser: () => forceCompleteOnboarding('user'),
      completeAsFundi: () => forceCompleteOnboarding('fundi'),
      completeAsBusiness: () => forceCompleteOnboarding('business'),
      fixUserType: fixUserType,
      fixToUser: () => fixUserType('user'),
      fixToFundi: () => fixUserType('fundi'),
      fixToBusiness: () => fixUserType('business')
    }
    console.log('🔧 Debug utilities available on window.debugAuth')
  }
}
