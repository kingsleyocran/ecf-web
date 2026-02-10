#!/bin/bash
# Script to fix Pub/Sub service identity generation error for Firebase Functions

echo "Fixing Pub/Sub service identity issue..."

PROJECT_ID="ecf-web"
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

echo "Project: $PROJECT_ID (Number: $PROJECT_NUMBER)"

# Enable required APIs
echo "Enabling required APIs..."
gcloud services enable pubsub.googleapis.com --project=$PROJECT_ID
gcloud services enable eventarc.googleapis.com --project=$PROJECT_ID
gcloud services enable storage.googleapis.com --project=$PROJECT_ID

# Grant necessary permissions to Firebase service account
echo "Granting permissions to Firebase service account..."
FIREBASE_SA="${PROJECT_NUMBER}@cloudservices.gserviceaccount.com"

# Grant serviceAccountUser role to allow creating service identities
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$FIREBASE_SA" \
  --role="roles/serviceusage.serviceUsageConsumer"

# Grant Pub/Sub Admin role (or at minimum Pub/Sub Editor)
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$FIREBASE_SA" \
  --role="roles/pubsub.admin"

# Try to manually create the service identity if needed
echo "Creating Pub/Sub service identity..."
gcloud beta services identity create --service=pubsub.googleapis.com --project=$PROJECT_ID || echo "Service identity may already exist or creation failed"

echo ""
echo "Service identity fix completed. Try deploying again with:"
echo "  firebase deploy --only hosting"


