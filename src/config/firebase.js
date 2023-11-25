import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD87XwdCKZ8GdegFd-P__6PoyHpSv52Wcg",
  authDomain: "fb-restaurante-alumnos-jc.firebaseapp.com",
  projectId: "fb-restaurante-alumnos-jc",
  storageBucket: "fb-restaurante-alumnos-jc.appspot.com",
  messagingSenderId: "604867364558",
  appId: "1:604867364558:web:83d5c2241d41ea1c86f29f"
};


initializeApp(firebaseConfig);

export const db = getFirestore();