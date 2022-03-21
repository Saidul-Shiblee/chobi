import { deleteObject, ref } from "firebase/storage";
import { projectStorage } from "./firebase";

const deleFile = async (filePath) => {
  const desertRef = ref(projectStorage, filePath);
  await deleteObject(desertRef);
};

export default deleFile;
