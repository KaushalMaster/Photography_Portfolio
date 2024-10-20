// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5-DAHM_yfvPehReJuSdQDiry3GFh0qi4",
  authDomain: "portfolio-8ccad.firebaseapp.com",
  projectId: "portfolio-8ccad",
  storageBucket: "portfolio-8ccad.appspot.com",
  messagingSenderId: "805462325078",
  appId: "1:805462325078:web:78d017310a79effc20c8f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Store the images
export const imgDB = getStorage(app);

// Store the images to display it.
export const db = getFirestore(app);

