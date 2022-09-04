import { projectStorage } from "./firebase";

export default function uploadFile(fileInfo, setProgress = 0) {
  const promises = fileInfo.map((item) => {
    const uploadRef = projectStorage
      .ref()
      .child(`${item.path}/${item.imageName}`);
    const uploadTask = uploadRef.put(item.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(progress);
      },
      (error) => alert(error.code)
    );
    return uploadTask.then(() => uploadRef.getDownloadURL());
  });

  return Promise.all(promises);
}
