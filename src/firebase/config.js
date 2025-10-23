import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNx-1nf3AieAgRK9BQa62Is2T29uxiL_A",
  authDomain: "mymoney-50ffc.firebaseapp.com",
  projectId: "mymoney-50ffc",
  storageBucket: "mymoney-50ffc.firebasestorage.app",
  messagingSenderId: "822821705279",
  appId: "1:822821705279:web:c4e9511514cdc0776b0a8a"
};

// init services
const projetFirestore = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const projectAuth = getAuth(projetFirestore);

export { projetFirestore, projectAuth }
