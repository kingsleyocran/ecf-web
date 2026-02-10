#!/bin/bash
# Script to fix Cloud Function permissions for Firebase Hosting

echo "Granting access to Cloud Function (Gen2)..."

# For Gen2 functions, set IAM policy on the underlying Cloud Run service
# Option 1: Grant access to Firebase Hosting service account (recommended for Firebase Hosting)
# This allows Firebase Hosting to invoke the function
FIREBASE_HOSTING_SA="$(gcloud projects describe ecf-web --format='value(projectNumber)')@cloudservices.gserviceaccount.com"
echo "Granting access to Firebase Hosting service account: $FIREBASE_HOSTING_SA"
gcloud run services add-iam-policy-binding ssrecfweb \
  --region=us-central1 \
  --member="serviceAccount:$FIREBASE_HOSTING_SA" \
  --role=roles/run.invoker

# Option 2: If you need public access and organization policy allows it, uncomment below:
# echo "Granting public access (if organization policy allows)..."
# gcloud run services add-iam-policy-binding ssrecfweb \
#   --region=us-central1 \
#   --member=allUsers \
#   --role=roles/run.invoker

# Option 3: Grant public access (unauthenticated users)
# This allows anyone to access the function without authentication
echo "Granting public access (allUsers)..."
if gcloud run services add-iam-policy-binding ssrecfweb \
  --region=us-central1 \
  --member=allUsers \
  --role=roles/run.invoker 2>&1; then
  echo "✓ Public access granted successfully!"
else
  echo ""
  echo "✗ ERROR: Organization policy is blocking public access (allUsers)."
  echo ""
  echo "To resolve this, you need to:"
  echo "1. Check your organization policy:"
  echo "   gcloud organizations list"
  echo "   gcloud org-policies describe constraints/iam.allowedPolicyMemberDomains --organization=YOUR_ORG_ID"
  echo ""
  echo "2. Contact your Google Cloud organization admin to:"
  echo "   - Create an exception for this Cloud Run service (ssrecfweb)"
  echo "   - Or modify constraints/iam.allowedPolicyMemberDomains to allow allUsers"
  echo ""
  echo "3. Alternatively, the function has been configured with invoker: 'public' in server.js"
  echo "   Try deploying with: firebase deploy --only hosting"
  echo "   Firebase may be able to set public access during deployment."
  exit 1
fi

echo ""
echo "Permissions updated. Please test your site at https://ecf-web.web.app"

