# Add Attributes to Collections Script
Write-Host "Adding attributes to all collections..." -ForegroundColor Green

$databaseId = "fundihub-db"

# Users collection attributes
Write-Host "Adding attributes to Users collection..." -ForegroundColor Blue
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "email" --size 255 --required true
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "name" --size 255 --required true
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "phone" --size 20 --required false
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "userType" --size 20 --required true
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "avatar" --size 255 --required false
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "location" --size 255 --required false
appwrite databases create-boolean-attribute --database-id $databaseId --collection-id "users" --key "isVerified" --required true --default false
appwrite databases create-boolean-attribute --database-id $databaseId --collection-id "users" --key "isActive" --required true --default true
appwrite databases create-boolean-attribute --database-id $databaseId --collection-id "users" --key "onboardingCompleted" --required true --default false
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "preferences" --size 1000 --required false

# Create indexes for users
Start-Sleep -Seconds 2
appwrite databases create-index --database-id $databaseId --collection-id "users" --key "email_index" --type "unique" --attributes "email"
appwrite databases create-index --database-id $databaseId --collection-id "users" --key "userType_index" --type "key" --attributes "userType"
appwrite databases create-index --database-id $databaseId --collection-id "users" --key "location_index" --type "key" --attributes "location"

# Fundis collection attributes
Write-Host "Adding attributes to Fundis collection..." -ForegroundColor Blue
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "userId" --size 36 --required true
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "specialization" --size 100 --required true --array true
appwrite databases create-integer-attribute --database-id $databaseId --collection-id "fundis" --key "experience" --required true --min 0 --max 50
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "skills" --size 100 --required false --array true
appwrite databases create-float-attribute --database-id $databaseId --collection-id "fundis" --key "hourlyRate" --required false --min 0
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "availability" --size 500 --required false
appwrite databases create-integer-attribute --database-id $databaseId --collection-id "fundis" --key "workRadius" --required false --min 1 --max 100
appwrite databases create-float-attribute --database-id $databaseId --collection-id "fundis" --key "rating" --required true --default 0 --min 0 --max 5
appwrite databases create-integer-attribute --database-id $databaseId --collection-id "fundis" --key "totalJobs" --required true --default 0 --min 0
appwrite databases create-integer-attribute --database-id $databaseId --collection-id "fundis" --key "completedJobs" --required true --default 0 --min 0
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "certifications" --size 255 --required false --array true
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "tools" --size 100 --required false --array true
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "portfolio" --size 255 --required false --array true
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "bio" --size 1000 --required false
appwrite databases create-boolean-attribute --database-id $databaseId --collection-id "fundis" --key "isAvailable" --required true --default true

# Create indexes for fundis
Start-Sleep -Seconds 2
appwrite databases createIndex --database-id $databaseId --collection-id "fundis" --key "userId_index" --type "unique" --attributes "userId"
appwrite databases createIndex --database-id $databaseId --collection-id "fundis" --key "specialization_index" --type "key" --attributes "specialization"
appwrite databases createIndex --database-id $databaseId --collection-id "fundis" --key "rating_index" --type "key" --attributes "rating" --orders "DESC"
appwrite databases createIndex --database-id $databaseId --collection-id "fundis" --key "hourlyRate_index" --type "key" --attributes "hourlyRate"

# Businesses collection attributes
Write-Host "Adding attributes to Businesses collection..." -ForegroundColor Blue
appwrite databases createStringAttribute --database-id $databaseId --collection-id "businesses" --key "userId" --size 36 --required true
appwrite databases createStringAttribute --database-id $databaseId --collection-id "businesses" --key "businessName" --size 255 --required true
appwrite databases createStringAttribute --database-id $databaseId --collection-id "businesses" --key "businessType" --size 100 --required true
appwrite databases createStringAttribute --database-id $databaseId --collection-id "businesses" --key "description" --size 1000 --required false
appwrite databases createUrlAttribute --database-id $databaseId --collection-id "businesses" --key "website" --required false
appwrite databases createStringAttribute --database-id $databaseId --collection-id "businesses" --key "address" --size 500 --required false
appwrite databases createStringAttribute --database-id $databaseId --collection-id "businesses" --key "logo" --size 255 --required false
appwrite databases createIntegerAttribute --database-id $databaseId --collection-id "businesses" --key "employeeCount" --required false --min 1
appwrite databases createIntegerAttribute --database-id $databaseId --collection-id "businesses" --key "establishedYear" --required false --min 1900 --max 2025
appwrite databases createStringAttribute --database-id $databaseId --collection-id "businesses" --key "services" --size 100 --required false --array true
appwrite databases createBooleanAttribute --database-id $databaseId --collection-id "businesses" --key "isVerified" --required true --default false

# Create indexes for businesses
Start-Sleep -Seconds 2
appwrite databases createIndex --database-id $databaseId --collection-id "businesses" --key "userId_index" --type "unique" --attributes "userId"
appwrite databases createIndex --database-id $databaseId --collection-id "businesses" --key "businessType_index" --type "key" --attributes "businessType"
appwrite databases createIndex --database-id $databaseId --collection-id "businesses" --key "businessName_index" --type "key" --attributes "businessName"

Write-Host "Basic attributes added! Run this script multiple times for remaining collections..." -ForegroundColor Green
Write-Host "Collections remaining: projects, bookings, reviews, messages, notifications, portfolios, services" -ForegroundColor Yellow
