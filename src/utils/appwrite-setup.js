import { account, databases, DATABASE_ID, COLLECTIONS } from '@/services/appwrite'
import { Permission, Role } from 'appwrite'

// Database and collection setup for development
export const setupAppwriteDatabase = async () => {
  try {
    console.log('Setting up Appwrite database and collections...')
    
    // Check if database exists (don't try to create it)
    try {
      const db = await databases.get(DATABASE_ID)
      console.log('Database found:', db.name)
    } catch (error) {
      if (error.code === 404) {
        console.error('❌ Database not found! Please create the database in Appwrite Console first.')
        console.log('Steps to fix:')
        console.log('1. Go to https://cloud.appwrite.io/console')
        console.log('2. Select your project')
        console.log('3. Go to Databases')
        console.log(`4. Create a database with ID: ${DATABASE_ID}`)
        return false
      } else {
        console.warn('Database check failed:', error.message)
        return false
      }
    }

    // Collection definitions with simpler permissions
    const collections = [
      {
        id: COLLECTIONS.USERS,
        name: 'Users',
        attributes: [
          { key: 'userId', type: 'string', size: 255, required: true },
          { key: 'email', type: 'string', size: 255, required: true },
          { key: 'name', type: 'string', size: 255, required: true },
          { key: 'phone', type: 'string', size: 50, required: false },
          { key: 'userType', type: 'string', size: 50, required: true },
          { key: 'onboardingComplete', type: 'boolean', required: true },
          { key: 'avatar', type: 'string', size: 500, required: false },
          { key: 'verified', type: 'boolean', required: true },
          { key: 'rating', type: 'double', required: false },
          { key: 'totalProjects', type: 'integer', required: false },
          { key: 'createdAt', type: 'datetime', required: true },
          { key: 'updatedAt', type: 'datetime', required: false }
        ]
      }
    ]

    // Create collections with basic permissions
    for (const collection of collections) {
      try {
        await databases.getCollection(DATABASE_ID, collection.id)
        console.log('Collection already exists:', collection.name)
      } catch (error) {
        if (error.code === 404) {
          console.log('Creating collection:', collection.name)
          
          try {
            // Create collection with basic permissions
            await databases.createCollection(
              DATABASE_ID,
              collection.id,
              collection.name,
              [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
              ]
            )

            // Add essential attributes only
            const essentialAttributes = collection.attributes.slice(0, 6) // First 6 attributes
            
            for (const attr of essentialAttributes) {
              try {
                if (attr.type === 'string') {
                  await databases.createStringAttribute(
                    DATABASE_ID,
                    collection.id,
                    attr.key,
                    attr.size,
                    attr.required
                  )
                } else if (attr.type === 'boolean') {
                  await databases.createBooleanAttribute(
                    DATABASE_ID,
                    collection.id,
                    attr.key,
                    attr.required
                  )
                } else if (attr.type === 'datetime') {
                  await databases.createDatetimeAttribute(
                    DATABASE_ID,
                    collection.id,
                    attr.key,
                    attr.required
                  )
                }
                
                // Wait between attribute creation
                await new Promise(resolve => setTimeout(resolve, 1000))
              } catch (attrError) {
                console.warn(`Failed to create attribute ${attr.key}:`, attrError.message)
              }
            }
            
            console.log(`Collection ${collection.name} created successfully`)
          } catch (createError) {
            console.warn(`Could not create collection ${collection.name}:`, createError.message)
          }
        } else {
          console.warn(`Collection check failed for ${collection.name}:`, error.message)
        }
      }
    }

    console.log('Appwrite setup completed!')
    return true
  } catch (error) {
    console.error('Appwrite setup failed:', error)
    return false
  }
}

// Test function to verify setup
export const testAppwriteConnection = async () => {
  try {
    console.log('🔍 Starting connection test...')
    console.log('Configuration:')
    console.log('- Endpoint:', import.meta.env.VITE_APPWRITE_ENDPOINT)
    console.log('- Project ID:', import.meta.env.VITE_APPWRITE_PROJECT_ID)
    console.log('- Database ID:', import.meta.env.VITE_APPWRITE_DATABASE_ID)
    
    // First, try a basic health check by testing account service
    console.log('🔍 Testing basic Appwrite connection...')
    
    try {
      // Try to get current user (will fail with 401 if no session, but that's fine)
      const user = await account.get()
      console.log('✅ Connection successful - User session found:', user.email)
      return true
    } catch (error) {
      if (error.code === 401) {
        console.log('✅ Connection successful - No user session (this is normal for testing)')
      } else if (error.code === 403) {
        console.log('✅ Connection successful - Access denied (but connection works)')
      } else {
        console.error('❌ Connection failed with code:', error.code)
        console.error('❌ Error message:', error.message)
        console.error('❌ Full error:', error)
        return false
      }
    }
    
    // Now test database connection
    console.log('🔍 Testing database connection...')
    try {
      const database = await databases.get(DATABASE_ID)
      console.log('✅ Database connection successful:', database.name)
      
      // Test collections list
      try {
        const collections = await databases.listCollections(DATABASE_ID)
        console.log(`✅ Found ${collections.total} collections in database`)
        
        collections.collections.forEach(col => {
          console.log(`  - ${col.name} (ID: ${col.$id})`)
        })
        
        // Test if users collection exists
        const usersCollection = collections.collections.find(col => col.$id === 'users')
        if (usersCollection) {
          console.log('✅ Users collection found!')
        } else {
          console.log('⚠️ Users collection not found - needs to be created')
        }
      } catch (listError) {
        console.log('⚠️ Could not list collections:', listError.message)
      }
      
      return true
    } catch (dbError) {
      if (dbError.code === 404) {
        console.error('❌ Database not found!')
        console.log('Database ID being used:', DATABASE_ID)
        console.log('Make sure you created a database with this exact ID in Appwrite Console')
        return false
      } else {
        console.error('❌ Database connection failed with code:', dbError.code)
        console.error('❌ Error message:', dbError.message)
        console.error('❌ Full error:', dbError)
        return false
      }
    }
  } catch (error) {
    console.error('❌ Overall connection test failed:', error)
    return false
  }
}
