import firebase from 'firebase/compat/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
const storage = getStorage();

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

  let trails = [];
  (await activities).forEach((activity) => {
      try {
        const lat = activity.coordinates._lat;
        const lon = activity.coordinates._long;

        const bottom_lat = bounds._sw.lat;
        const top_lat = bounds._ne.lat;
        const left_lon = bounds._sw.lng;
        const right_lon = bounds._ne.lng;

        //console.log(lat, lon, bottom_lat, top_lat, left_lon, right_lon);

        if(lat > bottom_lat && lat < top_lat && lon > left_lon && lon < right_lon) {
          trails.push(activity);
        }
      } catch {

      }
  });
  return trails;
}


/**
 * Retrieves user data by their ID from the "users" collection.
 *
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<Object>} A Promise that resolves to an object representing the user's data.
 * @throws {Error} Throws an error if the user is not found or if there is an issue retrieving the data.
 */
export async function getUserById(id) {
  try {
    // Retrieve the user document from the "users" collection
    const usersCollection = db.collection('users');
    const userDoc = await usersCollection.doc(id).get();

    // check if the user document exists
    if (!userDoc.exists) {
      throw new Error('User not found.');
    }

    // extract the user data from the document and return user object
    const userData = userDoc.data();
    return userData;

  } catch (error) {
    throw new Error(error.message);
  }
}


/**
 * Uploads the specified file as the user's profile image to Firebase Storage.
 *
 * @param {string} userId - The user's ID.
 * @param {File} file - The file object representing the user's new profile image.
 * @returns {Promise<void>} A Promise that resolves when the profile image is successfully uploaded.
 * @throws {Error} Throws an error if there is an issue uploading the profile image.
 */
export async function setProfileImage(userId, file) {
  try {
    const storageRef = ref(storage, `profile_images/${userId}`);
    await uploadBytes(storageRef, file);

  } catch (error) {
    throw new Error('Error uploading profile image in setProfileImage: ' + error.message);
  }
}


/**
 * Retrieves the download URL for the user's profile image.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<string>} A Promise that resolves to the download URL of the user's profile image.
 * @throws {Error} Throws an error if there is an issue getting the profile image.
 */
export async function getProfileImage(userId) {
  try {
    const storageRef = ref(storage, `profile_images/${userId}`);
    const url = await getDownloadURL(storageRef);
    return url;

  } catch (error) {
    throw new Error('Error getting profile image in getProfileImage' + error.message);
  }
}

