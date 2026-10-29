// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCX8MrhWykX29jmInLWU1Iw1Gw0320ef5Y",
  authDomain: "clonex-675a0.firebaseapp.com",
  projectId: "clonex-675a0",
  storageBucket: "clonex-675a0.firebasestorage.app",
  messagingSenderId: "693300312962",
  appId: "1:693300312962:web:7e7501db36077f6b7c6d9b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp)