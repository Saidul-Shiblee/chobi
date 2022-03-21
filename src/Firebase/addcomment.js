import { doc, setDoc } from "firebase/firestore";
import { projectFirestore, timestamp } from "./firebase";

const addComment = (collectionName, data, docID, cID) => {
  const docRef = doc(projectFirestore, collectionName, docID, "comments", cID);

  setDoc(docRef, {
    ...data,
    timestamp,
  });
};

export default addComment;
