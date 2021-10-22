// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnYy2NyGRUFGK6UjsK6HrRCtPIrceK4uo",
  authDomain: "hoelangnog-beta.firebaseapp.com",
  projectId: "hoelangnog-beta",
  storageBucket: "hoelangnog-beta.appspot.com",
  messagingSenderId: "988802117032",
  appId: "1:988802117032:web:1b8d970466f0b73c6b019d",
  measurementId: "G-9G1YYZCXSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
