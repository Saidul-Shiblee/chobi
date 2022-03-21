import { deleteDoc, doc } from "firebase/firestore";
import { projectFirestore } from "./firebase";

const deleteFromDB = async (collectionName, docID) => {
  await deleteDoc(doc(projectFirestore, collectionName, docID));
};

export default deleteFromDB;
