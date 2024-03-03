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
}

export async function getTrails(bounds) {
  const collection = db.collection('activities');
  let activities = collection.get().then((querySnapshot) => {
    let arr = [];
    querySnapshot.forEach((documentSnapshot) => {
      const data = documentSnapshot.data();
      arr.push(data);
    });
    return arr;
  });

  (await activities).forEach((activity) => {
      console.log(activity.coordinates);
      console.log(bounds);
      // if(activity.coordinates[0] > bounds[1][0]) {

      // }
  });
}


