import { Client, Account } from 'appwrite'

// Test direct account creation without our wrapper functions
export const testDirectRegistration = async (email, password, name) => {
  try {
    console.log('🧪 Testing direct Appwrite account creation...')
    
    // Create a fresh client instance
    const testClient = new Client()
    testClient
      .setEndpoint('https://fra.cloud.appwrite.io/v1')
      .setProject('68aab77c0025a66bc6e6')

    const testAccount = new Account(testClient)

    console.log('📧 Test Email:', email)
    console.log('👤 Test Name:', name)
    console.log('🌐 Endpoint:', 'https://fra.cloud.appwrite.io/v1')
    console.log('📦 Project ID:', '68aab77c0025a66bc6e6')

    // Try to create account
    console.log('📝 Creating account...')
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const result = await testAccount.create(
      userId,
      email,
      password,
      name
    )

    console.log('✅ Account created successfully!', result)
    return { success: true, result }

  } catch (error) {
    console.error('❌ Direct registration failed:', error)
    console.error('Error details:', {
      code: error.code,
      type: error.type,
      message: error.message,
      response: error.response
    })

    // Analyze the specific error
    let analysis = 'Unknown error'
    
    if (error.code === 401) {
      analysis = 'Authentication/Authorization issue - Check project ID and API keys'
    } else if (error.code === 400) {
      analysis = 'Bad Request - Check email format, password requirements, or user data'
    } else if (error.code === 409) {
      analysis = 'User already exists with this email'
    } else if (error.code === 429) {
      analysis = 'Rate limit exceeded - Too many requests'
    } else if (error.message && error.message.includes('fetch')) {
      analysis = 'Network error - Cannot reach Appwrite servers'
    } else if (error.message && error.message.includes('CORS')) {
      analysis = 'CORS error - Domain not configured in Appwrite project'
    }

    return { 
      success: false, 
      error: error.message,
      code: error.code,
      analysis
    }
  }
}

// Test project accessibility
export const testProjectConfig = async () => {
  try {
    console.log('🔍 Testing project configuration...')
    
    const testClient = new Client()
    testClient
      .setEndpoint('https://fra.cloud.appwrite.io/v1')
      .setProject('68aab77c0025a66bc6e6')

    const testAccount = new Account(testClient)

    // Try to get current user (should return 401 but confirms project exists)
    const result = await testAccount.get()
    console.log('✅ Unexpected success - user is logged in:', result)
    return { success: true, loggedIn: true, user: result }

  } catch (error) {
    if (error.code === 401) {
      console.log('✅ Project configuration is correct (401 expected)')
      return { success: true, loggedIn: false, message: 'Project accessible but no user session' }
    } else if (error.code === 404) {
      console.error('❌ Project not found - Invalid project ID')
      return { success: false, error: 'Project not found', code: 404 }
    } else {
      console.error('❌ Project test failed:', error)
      return { success: false, error: error.message, code: error.code }
    }
  }
}
