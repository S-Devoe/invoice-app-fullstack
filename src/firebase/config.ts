// Import the functions you need from the SDKs you need
// import * as firebase from "firebase/app";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRJkNFiHU7UAzXx6O8tYrxdxQ9JIHIB_w",
  authDomain: "invoice-app-c97a7.firebaseapp.com",
  databaseURL: "https://invoice-app-c97a7-default-rtdb.firebaseio.com",
  projectId: "invoice-app-c97a7",
  storageBucket: "invoice-app-c97a7.appspot.com",
  messagingSenderId: "302398903966",
  appId: "1:302398903966:web:41496aa7ee41f7f169cd8f",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
