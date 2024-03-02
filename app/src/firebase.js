import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDNK9F0zKZBLyJgKtHaRENnAaZXD0Y0aKo",
    authDomain: "shetreks-app.firebaseapp.com",
    projectId: "shetreks-app",
    storageBucket: "shetreks-app.appspot.com",
    messagingSenderId: "456150020543",
    appId: "1:456150020543:web:9fcb050f46576c2a4c710a"
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export async function getUsers() {
  const users = db.collection('users');
  users.get().then((querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      console.log(documentSnapshot.data());
    });
  });
  // console.log(col);
  // console.log(col.id);

}


