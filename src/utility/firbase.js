// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Modern modular import

const firebaseConfig = {
  apiKey: "AIzaSyChv7QmpGn8vwbM2aRWO00YtaMvK6J4OmE",
  authDomain: "dessiemart-31cbe.firebaseapp.com",
  projectId: "dessiemart-31cbe",
  storageBucket: "dessiemart-31cbe.appspot.com", // Fixed storage bucket format
  messagingSenderId: "693800253603",
  appId: "1:693800253603:web:f9ae064ab28af1608a2716",
  measurementId: "G-RCD3ZRV5MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Using the modular initializeApp
const analytics = getAnalytics(app);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Modern way to get Firestore

export { auth, db }; // Export both auth and db