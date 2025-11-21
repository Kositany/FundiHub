import { account, databases, DATABASE_ID, COLLECTIONS } from '@/services/appwrite'
import { Permission, Role, Query } from 'appwrite'

export const fixUserPermissions = async () => {
  try {
    console.log('🔧 Fixing user document permissions...')
    
    // Get current logged-in user account
    const currentAccount = await account.get()
    console.log('Current account:', currentAccount.email, currentAccount.$id)
    
    // Find user document by email
    const users = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USERS,
      [
        Query.equal('email', currentAccount.email)
      ]
    )
    
    if (users.documents.length === 0) {
      throw new Error('User document not found')
    }
    
    const userDoc = users.documents[0]
    console.log('Found user document:', userDoc.$id, userDoc.name)
    
    // Update document with proper permissions
    const updatedDoc = await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      userDoc.$id,
      {}, // No data changes, just permissions
      [
        Permission.read(Role.user(currentAccount.$id)),
        Permission.update(Role.user(currentAccount.$id)),
        Permission.delete(Role.user(currentAccount.$id))
      ]
    )
    
    console.log('✅ Permissions updated successfully!')
    return updatedDoc
    
  } catch (error) {
    console.error('❌ Error fixing permissions:', error)
    throw error
  }
}
