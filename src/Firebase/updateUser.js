import { doc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "./firebase";
import filedToUpdate from "./Utils/utils";

const UpdateUser = async (uID, data) => {
  const docRef = doc(projectFirestore, "users", uID);
  try {
    await updateDoc(docRef, filedToUpdate(data));
    return "Information Updated Successfully";
  } catch (error) {
    return error.message;
  }
};

export default UpdateUser;
