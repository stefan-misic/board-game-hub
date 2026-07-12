const {
  VITE_APPWRITE_API_ENDPOINT,
  VITE_APPWRITE_BUCKET_ID,
  VITE_APPWRITE_DATABASE_ID,
  VITE_APPWRITE_PROJECT_ID,
} = import.meta.env;

const appwriteConfig = {
  apiEndpoint: VITE_APPWRITE_API_ENDPOINT,
  bucketId: VITE_APPWRITE_BUCKET_ID,
  databaseId: VITE_APPWRITE_DATABASE_ID,
  projectId: VITE_APPWRITE_PROJECT_ID
};

const config = {
  appwriteConfig
};

export default config;
