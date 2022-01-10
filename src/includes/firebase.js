import firebase from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDue749fO77ZmWlCglVPcaCO4l-KIts2uE",
    authDomain: "vue-music-85bcf.firebaseapp.com",
    projectId: "vue-music-85bcf",
    storageBucket: "vue-music-85bcf.appspot.com",
    messagingSenderId: "814060927868",
    appId: "1:814060927868:web:ada3fb1a3d915b6cb0c2f9"
  };

export default firebase.initializeApp(firebaseConfig);
