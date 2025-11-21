import { Client, Account, Databases, Storage, Functions, Teams, AppwriteException } from 'appwrite'

// Appwrite Configuration using official starter pattern
const getEndpoint = () => {
  return import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1'
}

const getProjectId = () => {
  return import.meta.env.VITE_APPWRITE_PROJECT_ID || '68aab77c0025a66bc6e6'
}

const getProjectName = () => {
  return import.meta.env.VITE_APPWRITE_PROJECT_NAME || 'Fundi-Hub'
}

// Initialize client with proper error handling
const client = new Client()
  .setEndpoint(getEndpoint())
  .setProject(getProjectId())

// Initialize Appwrite services
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const functions = new Functions(client)
export const teams = new Teams(client)

// Export client and config getters
export { client, getEndpoint, getProjectId, getProjectName, AppwriteException }

// Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'fundihub-db'

export const COLLECTIONS = {
  USERS: 'users',
  FUNDIS: 'fundis',
  BUSINESSES: 'businesses',
  PROJECTS: 'projects',
  BOOKINGS: 'bookings',
  REVIEWS: 'reviews',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  PORTFOLIOS: 'portfolios',
  SERVICES: 'services'
}

// Storage Bucket IDs
export const BUCKETS = {
  AVATARS: 'avatars',
  PORTFOLIOS: 'portfolios',
  DOCUMENTS: 'documents',
  PROJECT_IMAGES: 'project-images'
}

// Helper function to handle Appwrite errors
export const handleAppwriteError = (error) => {
  console.error('Appwrite Error Details:', {
    code: error.code,
    type: error.type,
    message: error.message,
    response: error.response
  })
  
  // Network/connection errors
  if (error.message && (error.message.includes('fetch') || error.message.includes('load'))) {
    return 'Unable to connect to the server. Please check your internet connection and try again.'
  }
  
  // Handle AppwriteException specifically
  if (error instanceof AppwriteException) {
    if (error.code === 401) {
      return 'Authentication required. Please log in.'
    } else if (error.code === 403) {
      return 'Access denied. You do not have permission to perform this action.'
    } else if (error.code === 404) {
      return 'Resource not found. Please check your project configuration.'
    } else if (error.code === 409) {
      return 'A user with this email already exists. Please try logging in instead.'
    } else if (error.code >= 500) {
      return 'Server error. Please try again later.'
    }
  }
  
  return error.message || 'An unexpected error occurred.'
}

// Test connection function with proper Appwrite API call
export const testConnection = async () => {
  try {
    const start = Date.now()
    // Use account.get() as a simple health check - it will return 401 if no session but proves connectivity
    await account.get()
    const time = Date.now() - start
    return { success: true, time, message: 'Connected with active session' }
  } catch (error) {
    const time = Date.now() - start
    // 401 error means the service is reachable but no user is logged in - this is expected
    if (error.code === 401) {
      return { success: true, time, message: 'Connected (no active session)' }
    }
    // Any other error indicates a real connection problem
    return { 
      success: false, 
      time,
      error: error instanceof AppwriteException ? error : new Error(error.message) 
    }
  }
}

// Helper function to create unique document IDs
export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export default client
