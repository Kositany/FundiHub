# Create Dummy Accounts Script
Write-Host "Creating dummy accounts for testing..." -ForegroundColor Green

$databaseId = "fundihub-db"

# Create dummy users in authentication
Write-Host "Creating authentication accounts..." -ForegroundColor Blue

# User 1 - Regular User
Write-Host "Creating regular user account..." -ForegroundColor Cyan
appwrite users create --user-id "user_001" --email "user@fundihub.com" --password "password123" --name "John Doe"

# User 2 - Fundi
Write-Host "Creating fundi account..." -ForegroundColor Cyan
appwrite users create --user-id "fundi_001" --email "fundi@fundihub.com" --password "password123" --name "Mike Builder"

# User 3 - Business
Write-Host "Creating business account..." -ForegroundColor Cyan
appwrite users create --user-id "business_001" --email "business@fundihub.com" --password "password123" --name "ABC Construction"

# Add user records to database
Write-Host "Adding user records to database..." -ForegroundColor Blue

# Regular User Profile
appwrite databases create-document --database-id $databaseId --collection-id "users" --document-id "user_001" --data '{
  "email": "user@fundihub.com",
  "name": "John Doe",
  "userType": "user",
  "isVerified": true,
  "onboardingCompleted": true
}'

# Fundi User Profile
appwrite databases create-document --database-id $databaseId --collection-id "users" --document-id "fundi_001" --data '{
  "email": "fundi@fundihub.com", 
  "name": "Mike Builder",
  "userType": "fundi",
  "isVerified": true,
  "onboardingCompleted": true
}'

# Business User Profile  
appwrite databases create-document --database-id $databaseId --collection-id "users" --document-id "business_001" --data '{
  "email": "business@fundihub.com",
  "name": "ABC Construction", 
  "userType": "business",
  "isVerified": true,
  "onboardingCompleted": true
}'

# Add Fundi Profile
Write-Host "Creating fundi profile..." -ForegroundColor Blue
appwrite databases create-document --database-id $databaseId --collection-id "fundis" --document-id "fundi_profile_001" --data '{
  "userId": "fundi_001",
  "specialization": ["construction", "plumbing"],
  "experience": 5,
  "rating": 4.5
}'

# Add Business Profile
Write-Host "Creating business profile..." -ForegroundColor Blue
appwrite databases create-document --database-id $databaseId --collection-id "businesses" --document-id "business_profile_001" --data '{
  "userId": "business_001",
  "businessName": "ABC Construction Ltd",
  "businessType": "construction"
}'

Write-Host "Dummy accounts created successfully!" -ForegroundColor Green
Write-Host "Login credentials:" -ForegroundColor Yellow
Write-Host "Regular User - Email: user@fundihub.com, Password: password123" -ForegroundColor Cyan
Write-Host "Fundi - Email: fundi@fundihub.com, Password: password123" -ForegroundColor Cyan  
Write-Host "Business - Email: business@fundihub.com, Password: password123" -ForegroundColor Cyan
