#!/bin/bash

echo "🚀 Setting up FundiHub Database with Appwrite CLI..."

# Login to Appwrite (you'll need to do this first)
echo "📝 Please login to Appwrite first:"
echo "Run: appwrite login"
echo ""

# Set the project
echo "🎯 Setting project context..."
appwrite client --endpoint https://nyc.cloud.appwrite.io/v1
appwrite client --project-id 68ab76e6001074aa3acb

# Create database
echo "🗄️ Creating database..."
appwrite databases create --database-id "fundihub-db" --name "FundiHub Database"

# Create collections
echo "📋 Creating Users collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "users" \
  --name "Users" \
  --document-security true

echo "📋 Creating Fundis collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "fundis" \
  --name "Fundis" \
  --document-security true

echo "📋 Creating Businesses collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "businesses" \
  --name "Businesses" \
  --document-security true

echo "📋 Creating Projects collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "projects" \
  --name "Projects" \
  --document-security true

echo "📋 Creating Bookings collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "bookings" \
  --name "Bookings" \
  --document-security true

echo "📋 Creating Reviews collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "reviews" \
  --name "Reviews" \
  --document-security true

echo "📋 Creating Messages collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "messages" \
  --name "Messages" \
  --document-security true

echo "📋 Creating Notifications collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "notifications" \
  --name "Notifications" \
  --document-security true

echo "📋 Creating Portfolios collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "portfolios" \
  --name "Portfolios" \
  --document-security true

echo "📋 Creating Services collection..."
appwrite databases createCollection \
  --database-id "fundihub-db" \
  --collection-id "services" \
  --name "Services" \
  --document-security true

# Create storage buckets
echo "🗂️ Creating storage buckets..."
appwrite storage createBucket \
  --bucket-id "avatars" \
  --name "User Avatars" \
  --file-security true \
  --maximum-file-size 5000000

appwrite storage createBucket \
  --bucket-id "portfolios" \
  --name "Portfolio Images" \
  --file-security true \
  --maximum-file-size 10000000

appwrite storage createBucket \
  --bucket-id "documents" \
  --name "Documents" \
  --file-security true \
  --maximum-file-size 20000000

appwrite storage createBucket \
  --bucket-id "project-images" \
  --name "Project Images" \
  --file-security true \
  --maximum-file-size 15000000

appwrite storage createBucket \
  --bucket-id "attachments" \
  --name "Message Attachments" \
  --file-security true \
  --maximum-file-size 25000000

echo "✅ Database setup complete!"
echo "📝 Next steps:"
echo "1. Add attributes to each collection using the Appwrite console"
echo "2. Set up collection permissions"
echo "3. Configure storage bucket permissions"
