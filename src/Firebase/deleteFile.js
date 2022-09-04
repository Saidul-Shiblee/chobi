import { deleteObject, ref } from "firebase/storage";
import { projectStorage } from "./firebase";

const deleteFile = async (filePath) => {
  const fileRef = ref(projectStorage, filePath);
  await deleteObject(fileRef);
};

export default deleteFile;
