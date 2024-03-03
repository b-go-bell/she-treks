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
 * Retrieves the download URL for a profile or post image.
 *
 * @param {string} imgID - The unique identifier of the image: userID for profile pic, postID for post pic
 * @returns {Promise<string>} A Promise that resolves to the download URL of the desired image.
 * @throws {Error} Throws an error if there is an issue getting the desired image.
 */
export async function getImage(type, imgID) {
  try {
    let folder = "post_images";
    if (type === "profile") {
      folder = "profile_images"
    } else if(type === "activity") {
      folder = "activity_images";
    }

    const storageRef = ref(storage, `${folder}/${imgID}`);
    const url = await getDownloadURL(storageRef);
    return url;

  } catch (error) {
    throw new Error('Error getting image in getImage' + error.message);
  }
}


/**
 * Retrieves posts by the specified user's ID from the "posts" collection.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of objects representing the user's posts.
 * @throws {Error} Throws an error if there is an issue retrieving the posts or if the user is not found.
 */
export async function getPostsByUserId(userId) {
  try {
    // Retrieve posts from the "posts" collection where the author field matches the provided user ID
    const postsCollection = db.collection('posts');
    const postsQuery = await postsCollection.where('author', '==', userId).get();

    // Check if the user has any posts
    if (postsQuery.empty) {
      return [];
    }

    // Extract and return the posts data
    const postsData = postsQuery.docs.map(postDoc => postDoc.data());
    return postsData;
  } catch (error) {
    throw new Error(error.message);
  }
}


/**
 * Retrieve trips data for a specific user based on trip status.
 *
 * @param {string} tripStatus - The status of the trips to retrieve (e.g., 'invitees', 'accepted').
 * @param {string} userId - The user ID to check in the tripStatus array field.
 * @returns {Promise<Array>} An array of trip data for the specified user and trip status.
 * @throws {Error} Throws an error if there is an issue with the Firestore query or retrieval.
 */
export async function getTripsByUserId(tripStatus, userId) {
  try {
    // Retrieve posts from the "trips" collection where the tripStatus field's array contains the user
    const tripsCollection = db.collection('trips');
    const tripsQuery = await tripsCollection.where(tripStatus, 'array-contains', userId).get();

    if (tripsQuery.empty) {
      return [];
    }

    // Extract and return the trips data
    const tripsData = tripsQuery.docs.map(tripDoc => tripDoc.data());
    return tripsData;
  } catch (error) {
    throw new Error(error.message);
  }
}


/**
 * Updates the invitees, accepted, or declined arrays in a trip document based on a user's action.
 *
 * @param {string} tripId - The ID of the trip document.
 * @param {string} userId - The ID of the user performing the action.
 * @param {string} action - The action to perform ('accept' or 'decline').
 * @throws Will throw an error if the trip document is not found or if an invalid action is provided.
 */
export async function updateTripMembers(tripId, userId, action) {
  try {
    const tripRef = db.collection('trips').doc(tripId);
    
    // Use Firestore transaction to ensure atomic updates
    await db.runTransaction(async (transaction) => {
      const tripDoc = await transaction.get(tripRef);

      if (!tripDoc.exists) {
        throw new Error('Trip not found.');
      }

      // Update the invitees array based on the user's action
      if (action === 'accept') {
        transaction.update(tripRef, {
          invitees: firebase.firestore.FieldValue.arrayRemove(userId),
          accepted: firebase.firestore.FieldValue.arrayUnion(userId),
        });
      } else if (action === 'decline') {
        transaction.update(tripRef, {
          invitees: firebase.firestore.FieldValue.arrayRemove(userId),
          declined: firebase.firestore.FieldValue.arrayUnion(userId),
        });
      } 
    });

    console.log('Trip members updated successfully.');
  } catch (error) {
    console.error('Error updating trip members:', error.message);
    throw new Error('Error updating trip members.');
  }
}