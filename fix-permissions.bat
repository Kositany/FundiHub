@echo off
echo Fixing document permissions for fundi_admin_001...

appwrite databases update-document ^
  --database-id fundihub-db ^
  --collection-id users ^
  --document-id fundi_admin_001 ^
  --permissions "read(\"any\")" "update(\"any\")" "delete(\"any\")"

echo Fixing document permissions for user_admin_001...

appwrite databases update-document ^
  --database-id fundihub-db ^
  --collection-id users ^
  --document-id user_admin_001 ^
  --permissions "read(\"any\")" "update(\"any\")" "delete(\"any\")"

echo Fixing document permissions for business_admin_001...

appwrite databases update-document ^
  --database-id fundihub-db ^
  --collection-id users ^
  --document-id business_admin_001 ^
  --permissions "read(\"any\")" "update(\"any\")" "delete(\"any\")"

echo Done!
