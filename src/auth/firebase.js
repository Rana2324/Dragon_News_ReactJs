// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v9-compat and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPiFJo6l_EAn5KyVrE5XIhEi8omV2uxhE",
    authDomain: "dragon-news-32160.firebaseapp.com",
    projectId: "dragon-news-32160",
    storageBucket: "dragon-news-32160.firebasestorage.app",
    messagingSenderId: "1000782585102",
    appId: "1:1000782585102:web:8d93c567939c3a6c374b5f",
    measurementId: "G-Z34DT9P1SJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
