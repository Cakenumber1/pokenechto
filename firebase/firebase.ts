import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDE-BHO1WOetHgxykBRsEIx6xtfVqTlmww",
  authDomain: "poke-e411b.firebaseapp.com",
  projectId: "poke-e411b",
  storageBucket: "poke-e411b.appspot.com",
  messagingSenderId: "137666981292",
  appId: "1:137666981292:web:8e065e951eb540e7771e09",
  measurementId: "G-JGYFVCNWC9"
};

let myApp
if (!firebase.apps.length) {
  myApp = firebase.initializeApp(firebaseConfig);
}else {
  myApp = firebase.app();
}

export const db = firebase.firestore();
export const str = firebase.storage();
export const fieldValue = firebase.firestore.FieldValue;
export const auth = firebase.auth();
export default myApp;
