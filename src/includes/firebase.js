import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDue749fO77ZmWlCglVPcaCO4l-KIts2uE",
    authDomain: "vue-music-85bcf.firebaseapp.com",
    projectId: "vue-music-85bcf",
    storageBucket: "vue-music-85bcf.appspot.com",
    messagingSenderId: "814060927868",
    appId: "1:814060927868:web:ada3fb1a3d915b6cb0c2f9"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore(); 
const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const storage = firebase.storage();

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  storage
}
