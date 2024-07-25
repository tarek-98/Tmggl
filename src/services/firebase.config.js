// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyewR8iAhYyMPg_X3bkcsbY9sMdWhqMBg",
  authDomain: "tam-otp.firebaseapp.com",
  projectId: "tam-otp",
  storageBucket: "tam-otp.appspot.com",
  messagingSenderId: "555815039438",
  appId: "1:555815039438:web:8f0d0a5b10696ecb2cbb9f",
  measurementId: "G-02046TP5T9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
