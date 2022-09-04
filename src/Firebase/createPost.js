import { doc, setDoc } from "firebase/firestore";
import { projectFirestore, timestamp } from "./firebase";

const addToDB = (collectionName, data, docID) => {
  const docRef = doc(projectFirestore, collectionName, docID);

  setDoc(docRef, {
    ...data,
    timestamp,
  });
};

export default addToDB;
