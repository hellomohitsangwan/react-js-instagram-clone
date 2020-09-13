import firebase from "firebase";

const firebaseApp = firebase.initializeApp(

{
  apiKey: "AIzaSyDtJDkpr3KPPzZuMyBA3Pc8_dBBegiqA-c",
  authDomain: "instagram-clone-react-1ff7d.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-1ff7d.firebaseio.com",
  projectId: "instagram-clone-react-1ff7d",
  storageBucket: "instagram-clone-react-1ff7d.appspot.com",
  messagingSenderId: "161589691092",
  appId: "1:161589691092:web:c9768418b4bb52a010f141",
  measurementId: "G-GQ2SF57ZZN"
}

);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db , auth , storage};
