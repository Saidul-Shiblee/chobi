import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzTw5rimaWdIzUBaUI_Dmi1xKA4qjOENw",
  authDomain: "chobi-b062a.firebaseapp.com",
  projectId: "chobi-b062a",
  storageBucket: "chobi-b062a.appspot.com",
  messagingSenderId: "1055698218018",
  appId: "1:1055698218018:web:d7b71edad36bb244dcee7b",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const { FieldValue } = firebase.firestore;

export { auth, projectStorage, projectFirestore, timestamp, FieldValue };
