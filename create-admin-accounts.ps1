# Create Admin Test Accounts using CLI
Write-Host "Creating admin test accounts for FundiHub..." -ForegroundColor Green

$databaseId = "fundihub-db"

# Create authentication accounts
Write-Host "Creating authentication accounts..." -ForegroundColor Blue

# Fundi Admin
Write-Host "Creating Fundi Admin account..." -ForegroundColor Cyan
appwrite users create `
  --user-id "fundi_admin_001" `
  --email "fundiadmin@fundihub.com" `
  --password "password123" `
  --name "Fundi Admin"

# User Admin  
Write-Host "Creating User Admin account..." -ForegroundColor Cyan
appwrite users create `
  --user-id "user_admin_001" `
  --email "useradmin@fundihub.com" `
  --password "password123" `
  --name "User Admin"

# Business Admin
Write-Host "Creating Business Admin account..." -ForegroundColor Cyan
appwrite users create `
  --user-id "business_admin_001" `
  --email "businessadmin@fundihub.com" `
  --password "password123" `
  --name "Business Admin"

Write-Host "Creating user profiles in database..." -ForegroundColor Blue

# Create Fundi Admin Profile
Write-Host "Creating fundi admin profile..." -ForegroundColor Cyan
appwrite databases create-document `
  --database-id "fundihub-db" `
  --collection-id "users" `
  --document-id "fundi_admin_001" `
  --data '{\"email\":\"fundiadmin@fundihub.com\",\"name\":\"Fundi Admin\",\"userType\":\"fundi\",\"isVerified\":true,\"onboardingCompleted\":true}'

# Create User Admin Profile
Write-Host "Creating user admin profile..." -ForegroundColor Cyan
appwrite databases create-document `
  --database-id "fundihub-db" `
  --collection-id "users" `
  --document-id "user_admin_001" `
  --data '{\"email\":\"useradmin@fundihub.com\",\"name\":\"User Admin\",\"userType\":\"user\",\"isVerified\":true,\"onboardingCompleted\":true}'

# Create Business Admin Profile
Write-Host "Creating business admin profile..." -ForegroundColor Cyan
appwrite databases create-document `
  --database-id "fundihub-db" `
  --collection-id "users" `
  --document-id "business_admin_001" `
  --data '{\"email\":\"businessadmin@fundihub.com\",\"name\":\"Business Admin\",\"userType\":\"business\",\"isVerified\":true,\"onboardingCompleted\":true}'

Write-Host "Creating specialized profiles..." -ForegroundColor Blue

# Create Fundi Professional Profile
Write-Host "Creating fundi professional profile..." -ForegroundColor Cyan
appwrite databases create-document `
  --database-id "fundihub-db" `
  --collection-id "fundis" `
  --document-id "fundi_profile_admin_001" `
  --data '{\"userId\":\"fundi_admin_001\",\"specialization\":[\"construction\",\"plumbing\",\"electrical\"],\"experience\":10,\"rating\":4.8}'

# Create Business Company Profile
Write-Host "Creating business company profile..." -ForegroundColor Cyan
appwrite databases create-document `
  --database-id "fundihub-db" `
  --collection-id "businesses" `
  --document-id "business_profile_admin_001" `
  --data '{\"userId\":\"business_admin_001\",\"businessName\":\"Admin Construction Ltd\",\"businessType\":\"construction\"}'

Write-Host "Admin accounts created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "LOGIN CREDENTIALS:" -ForegroundColor Yellow
Write-Host "==================" -ForegroundColor Yellow
Write-Host "Fundi Admin - Email: fundiadmin@fundihub.com, Password: password123" -ForegroundColor Cyan
Write-Host "User Admin - Email: useradmin@fundihub.com, Password: password123" -ForegroundColor Cyan
Write-Host "Business Admin - Email: businessadmin@fundihub.com, Password: password123" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can now log in and test all dashboard types!" -ForegroundColor Green

