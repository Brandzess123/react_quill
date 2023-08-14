// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAveAMOdYQbhl5upeMs_uLv9PgIDn93kjQ",
  authDomain: "starlit-braid-388001.firebaseapp.com",
  projectId: "starlit-braid-388001",
  storageBucket: "starlit-braid-388001.appspot.com",
  messagingSenderId: "87060862126",
  appId: "1:87060862126:web:88d0b7bc2cf72362aac93f",
  measurementId: "G-NHX6EFV104",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
