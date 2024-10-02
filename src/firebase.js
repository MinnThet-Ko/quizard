// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0FyRYmPYVPdYh7IEs0VrZdbh1Zc2nU-M",
    authDomain: "flashcard-abf29.firebaseapp.com",
    projectId: "flashcard-abf29",
    storageBucket: "flashcard-abf29.appspot.com",
    messagingSenderId: "410065376121",
    appId: "1:410065376121:web:fb9076a87d60b898f455a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;