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
      (error) => console.log(error.code)
    );
    return uploadTask.then(() => uploadRef.getDownloadURL());
  });
  return Promise.all(promises);
}

// function uploadFile(fileInfo) {
//   const promises = [];

//   fileInfo.forEach((item) => {
//     const uploadTask = projectStorage
//       .ref()
//       .child(`${item.path}/${item.imageName}`)
//       .put(item.file);
//     promises.push(uploadTask);
//   });

//   return Promise.all(promises);
// }

// // async function uploadFile(fileInfo) {
// //   const promises = [];
// //   const uploadTasks = await helperfunction(fileInfo);

// //   uploadTasks.forEach((uploadTask) => {
// //     uploadTask.task.on(
// //       "state_changed",
// //       (snapshot) => {
// //         console.log(snapshot);
// //         const progress =
// //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// //         console.log(`Progress: ${progress}%`);
// //       },
// //       (error) => console.log(error.code)
// //     );
// //     promises.push(uploadTask.task.snapshot.ref.getDownloadURL());
// //   });

// //   return Promise.all(promises);
// // }

// export { uploadFile };

// // //////////////////////////////////Single File at a time/////////////////////////////////////////
// // // import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// // // import { projectStorage } from "./firebase";

// // // export default function uploadFile(file, folder, fileName, setProgress) {
// // //   return new Promise((resolve, reject) => {
// // //     const storageRef = ref(projectStorage, `${folder}/` + fileName);
// // //     const upload = uploadBytesResumable(storageRef, file);

// // //     upload.on(
// // //       "state_changed",
// // //       (snapshot) => {
// // //         const progress =
// // //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// // //         setProgress(progress);
// // //       },
// // //       (error) => {
// // //         reject(error);
// // //       },
// // //       async () => {
// // //         try {
// // //           const url = await getDownloadURL(storageRef);
// // //           resolve(url);
// // //         } catch (error) {
// // //           reject(error);
// // //         }
// // //       }
// // //     );
// // //   });
// // // }

// export default function uploadFile(fileInfo, setProgress) {
//   const promises = [];
//   const urls = [];

//   fileInfo.forEach((item) => {
//     const uploadTask = projectStorage
//       .ref(`${item.path}/${item.imageName}`)
//       .put(item.file);
//     promises.push(uploadTask);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setProgress(progress);
//         console.log(`Progress: ${progress}%`);
//       },
//       (error) => console.log(error.code),
//       async () => {
//         await projectStorage
//           .ref(item.path)
//           .child(item.imageName)
//           .getDownloadURL()
//           .then((url) => urls.push(url));
//       }
//     );
//   });
//   Promise.all(promises).then(() => alert("all done"));
// }
