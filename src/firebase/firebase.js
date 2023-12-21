// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCik_HctHUpysXLHRL-D-k50bQSDhdLrW8",
  authDomain: "instagram-clone-70e88.firebaseapp.com",
  projectId: "instagram-clone-70e88",
  storageBucket: "instagram-clone-70e88.appspot.com",
  messagingSenderId: "550216807402",
  appId: "1:550216807402:web:7c2bc29e3900d3867c7893",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { auth, storage, firestore };
