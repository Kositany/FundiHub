# FundiHub Database Setup Script
Write-Host "Setting up FundiHub Database with Appwrite CLI..." -ForegroundColor Green

# Check if appwrite CLI is installed
try {
    appwrite --version | Out-Null
    Write-Host "Appwrite CLI found" -ForegroundColor Green
} catch {
    Write-Host "Appwrite CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g appwrite-cli" -ForegroundColor Yellow
    exit 1
}

Write-Host "Please make sure you're logged in to Appwrite:" -ForegroundColor Yellow
Write-Host "If not logged in, run: appwrite login" -ForegroundColor Cyan
Write-Host ""

# Set the project context
Write-Host "Setting project context..." -ForegroundColor Blue
appwrite client --endpoint "https://nyc.cloud.appwrite.io/v1"
appwrite client --project-id "68ab76e6001074aa3acb"

# Create database
Write-Host "Creating database..." -ForegroundColor Blue
appwrite databases create --database-id "fundihub-db" --name "FundiHub Database"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database created successfully" -ForegroundColor Green
} else {
    Write-Host "Database might already exist" -ForegroundColor Yellow
}

# Create collections
$collections = @(
    @{id="users"; name="Users"},
    @{id="fundis"; name="Fundis"},
    @{id="businesses"; name="Businesses"},
    @{id="projects"; name="Projects"},
    @{id="bookings"; name="Bookings"},
    @{id="reviews"; name="Reviews"},
    @{id="messages"; name="Messages"},
    @{id="notifications"; name="Notifications"},
    @{id="portfolios"; name="Portfolios"},
    @{id="services"; name="Services"}
)

foreach ($collection in $collections) {
    Write-Host "Creating $($collection.name) collection..." -ForegroundColor Blue
    appwrite databases create-collection --database-id "fundihub-db" --collection-id $collection.id --name $collection.name --document-security true
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "$($collection.name) collection created" -ForegroundColor Green
    } else {
        Write-Host "$($collection.name) collection might already exist" -ForegroundColor Yellow
    }
}

# Create storage buckets
Write-Host "Creating storage buckets..." -ForegroundColor Blue

$buckets = @(
    @{id="avatars"; name="User Avatars"; size=5000000},
    @{id="portfolios"; name="Portfolio Images"; size=10000000},
    @{id="documents"; name="Documents"; size=20000000},
    @{id="project-images"; name="Project Images"; size=15000000},
    @{id="attachments"; name="Message Attachments"; size=25000000}
)

foreach ($bucket in $buckets) {
    Write-Host "Creating $($bucket.name) bucket..." -ForegroundColor Blue
    appwrite storage create-bucket --bucket-id $bucket.id --name $bucket.name --file-security true --maximum-file-size $bucket.size
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "$($bucket.name) bucket created" -ForegroundColor Green
    } else {
        Write-Host "$($bucket.name) bucket might already exist" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Database setup complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Add attributes to each collection using:" -ForegroundColor Cyan
Write-Host "   - Appwrite console (GUI)" -ForegroundColor Cyan
Write-Host "   - Or use: .\add-attributes.ps1" -ForegroundColor Cyan
Write-Host "2. Set up collection permissions" -ForegroundColor Cyan
Write-Host "3. Configure storage bucket permissions" -ForegroundColor Cyan
