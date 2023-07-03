// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc3wxcZc1DuQmQ2uSoyFhWW1KiLSluEeY",
  authDomain: "orbly-3ddb4.firebaseapp.com",
  projectId: "orbly-3ddb4",
  storageBucket: "orbly-3ddb4.appspot.com",
  messagingSenderId: "516129071360",
  appId: "1:516129071360:web:b60cf6f5b49bd342cb53e5",
  measurementId: "G-G42ZZ0BZVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);