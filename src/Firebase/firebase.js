import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvbP9oV3jO0a1weO6xDHs5WJOHWOFoWIA",
  authDomain: "chobi-44d34.firebaseapp.com",
  projectId: "chobi-44d34",
  storageBucket: "chobi-44d34.appspot.com",
  messagingSenderId: "1003417687981",
  appId: "1:1003417687981:web:22b777ae809158de15f324",
  measurementId: "G-9PYYJ9GN8W",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const { FieldValue } = firebase.firestore;
export { app, auth, projectStorage, projectFirestore, timestamp, FieldValue };
