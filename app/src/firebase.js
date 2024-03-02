import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'; 

const firebaseConfig = {
    apiKey: "AIzaSyDNK9F0zKZBLyJgKtHaRENnAaZXD0Y0aKo",
    authDomain: "shetreks-app.firebaseapp.com",
    projectId: "shetreks-app",
    storageBucket: "shetreks-app.appspot.com",
    messagingSenderId: "456150020543",
    appId: "1:456150020543:web:9fcb050f46576c2a4c710a"
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function getUsers(db) {
    const col = collection(db, 'users');
    console.log(col);
  }