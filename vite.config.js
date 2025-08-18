import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define 'process' as an object with 'env' property
    'process': {
      'env': {
        FIREBASE_API_KEY:"AIzaSyB0FyRYmPYVPdYh7IEs0VrZdbh1Zc2nU-M",
        FIREBASE_AUTH_DOMAIN:"flashcard-abf29.firebaseapp.com",
        PROJECT_ID:"flashcard-abf29",
        STORAGE_BUCKET:"flashcard-abf29.appspot.com",
        MESSAGIN_SENDER_ID:"410065376121",
        APP_ID:"1:410065376121:web:fb9076a87d60b898f455a8",
      }
    },
    // Optionally, you can also define specific checks for 'process'
    // to ensure compatibility with libraries that might check its type.
    // For example, to make 'typeof process !== 'undefined'' evaluate to true:
    'typeof process': JSON.stringify('object'),
  },
})
