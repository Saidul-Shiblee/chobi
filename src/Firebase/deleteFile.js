import { deleteObject, ref } from "firebase/storage";
import { projectStorage } from "./firebase";

const deleteFile = async (filePath) => {
  const desertRef = ref(projectStorage, filePath);
  await deleteObject(desertRef);
};

export default deleteFile;
