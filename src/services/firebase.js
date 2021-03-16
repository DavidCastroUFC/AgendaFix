import firebase from "firebase/app"
import "firebase/firebase-database";

let firebaseConfig = {
    apiKey: "AIzaSyC9vLAu7yeYRfM2TDPBl-2HHWp8B-Q9ZVw",
    authDomain: "agendafix-19e84.firebaseapp.com",
    databaseURL: "https://agendafix-19e84-default-rtdb.firebaseio.com",
    projectId: "agendafix-19e84",
    storageBucket: "agendafix-19e84.appspot.com",
    messagingSenderId: "803458609772",
    appId: "1:803458609772:web:03a2df1c36f708b5f2de49",
    measurementId: "G-RZ0QNH3218"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const database = firebase.database();

  export {database};
