import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { projectStorage } from "./firebase";

export default function uploadFile(file, folder, fileName, setProgress) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(projectStorage, `${folder}/` + fileName);
    const upload = uploadBytesResumable(storageRef, file);

    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}
