// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyChv7QmpGn8vwbM2aRWO00YtaMvK6J4OmE",
  authDomain: "dessiemart-31cbe.firebaseapp.com",
  projectId: "dessiemart-31cbe",
  storageBucket: "dessiemart-31cbe.appspot.com", 
  messagingSenderId: "693800253603",
  appId: "1:693800253603:web:f9ae064ab28af1608a2716",
  measurementId: "G-RCD3ZRV5MT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db }; 