import { doc, setDoc } from "firebase/firestore";
import { projectFirestore, timestamp } from "./firebase";

const addUser = (collectionName, data, docID) => {
  const docRef = doc(projectFirestore, collectionName, docID);

  setDoc(docRef, {
    ...data,
    dateCreated: timestamp,
  });
};

export default addUser;
