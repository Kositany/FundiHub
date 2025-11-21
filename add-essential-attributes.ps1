# Essential Attributes Setup Script
Write-Host "Adding essential attributes to FundiHub collections..." -ForegroundColor Green

$databaseId = "fundihub-db"

Write-Host "Adding Users collection attributes..." -ForegroundColor Blue
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "email" --size 255 --required true
Start-Sleep -Seconds 3
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "name" --size 255 --required true
Start-Sleep -Seconds 3
appwrite databases create-string-attribute --database-id $databaseId --collection-id "users" --key "userType" --size 20 --required true
Start-Sleep -Seconds 3
appwrite databases create-boolean-attribute --database-id $databaseId --collection-id "users" --key "isVerified" --required true --default false
Start-Sleep -Seconds 3
appwrite databases create-boolean-attribute --database-id $databaseId --collection-id "users" --key "onboardingCompleted" --required true --default false

Write-Host "Adding Fundis collection attributes..." -ForegroundColor Blue
Start-Sleep -Seconds 5
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "userId" --size 36 --required true
Start-Sleep -Seconds 3
appwrite databases create-string-attribute --database-id $databaseId --collection-id "fundis" --key "specialization" --size 100 --required true --array true
Start-Sleep -Seconds 3
appwrite databases create-integer-attribute --database-id $databaseId --collection-id "fundis" --key "experience" --required true --min 0 --max 50
Start-Sleep -Seconds 3
appwrite databases create-float-attribute --database-id $databaseId --collection-id "fundis" --key "rating" --required true --default 0 --min 0 --max 5

Write-Host "Adding Projects collection attributes..." -ForegroundColor Blue
Start-Sleep -Seconds 5
appwrite databases create-string-attribute --database-id $databaseId --collection-id "projects" --key "title" --size 255 --required true
Start-Sleep -Seconds 3
appwrite databases create-string-attribute --database-id $databaseId --collection-id "projects" --key "description" --size 2000 --required true
Start-Sleep -Seconds 3
appwrite databases create-string-attribute --database-id $databaseId --collection-id "projects" --key "clientId" --size 36 --required true
Start-Sleep -Seconds 3
appwrite databases create-string-attribute --database-id $databaseId --collection-id "projects" --key "status" --size 20 --required true --default "open"

Write-Host "Essential attributes added successfully!" -ForegroundColor Green
Write-Host "You can add more attributes through the Appwrite console." -ForegroundColor Yellow
