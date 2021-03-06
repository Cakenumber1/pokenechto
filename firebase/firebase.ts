import 'firebase/storage';

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// eslint-disable-next-line import/no-mutable-exports
let myApp;
if (!firebase.apps.length) {
  myApp = firebase.initializeApp(firebaseConfig);
} else {
  myApp = firebase.app();
}

export const db = firebase.firestore();
export const str = firebase.storage();
export const fieldValue = firebase.firestore.FieldValue;
export const auth = firebase.auth();
export default myApp;
