import { doc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "./firebase";

const UpdatePost = async (postID, data) => {
  const docRef = doc(projectFirestore, "images", postID);
  await updateDoc(docRef, data);
};

export default UpdatePost;
