import firebase from "firebase";

const firebaseApp = firebase.initializeApp(

{
  apiKey: "AIzaSyD",
  authDomain: "instagram-clon",
  databaseURL: "https://inst",
  projectId: "instagram-c",
  storageBucket: "instagra",
  messagingSenderId: "161",
  appId: "",
  measurementId: "G"
}

);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db , auth , storage};
