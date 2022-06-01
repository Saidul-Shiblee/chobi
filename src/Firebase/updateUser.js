import { doc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "./firebase";
import filedToUpdate from "./Utils/utils";

const UpdateUser = async (uID, data) => {
  const docRef = doc(projectFirestore, "users", uID);
  await updateDoc(docRef, filedToUpdate(data));
};

export default UpdateUser;
