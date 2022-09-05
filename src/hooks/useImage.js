import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import * as React from "react";
import { projectFirestore } from "../Firebase/firebase";
import { getUserByUserId } from "../Firebase/getUserByUserId";

const useImage = (collectionName = null, userID = null, purpose) => {
  const [documents, setDocuments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    async function getData() {
      const user = await getUserByUserId(userID);
      const data = user[0];
      const imageRef = collection(projectFirestore, "images");
      let q;
      switch (purpose) {
        case "post":
          q = query(
            imageRef,
            where("uID", "in", [...data.following, userID]),
            orderBy("timestamp", "desc")
          );
          break;
        case "profile":
          q = query(imageRef, where("uID", "==", userID));
          break;

        default:
          break;
      }
      const unsubscribe = await onSnapshot(
        q,
        //get data on realtime
        async (querySnapshot) => {
          setLoading(true);
          const results = Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const data = doc.data();
              const userInfo = await getUserByUserId(data.uID);
              return { id: doc.id, data, uPhoto: userInfo[0].uPhoto };
            })
          );
          const images = await results;
          if (isMounted) setDocuments(images);
          setLoading(false);
        },
        (error) => {
          alert(error.message);
        }
      );

      return () => {
        isMounted = false;
      };
    }

    getData();
  }, [collectionName, userID, purpose]);

  return {
    documents,
    loading,
  };
};

export default useImage;

//get data once

// async function getData() {
//   const user = await getUserByUserId(userID);
//   const data = user[0];

//   let querySnapshot;
//   switch (purpose) {
//     case "post":
//       querySnapshot = projectFirestore
//         .collection("images")
//         .where("uID", "in", [...data.following, userID])
//         .get();
//       break;
//     case "profile":
//       querySnapshot = projectFirestore
//         .collection("images")
//         .where("uID", "==", userID)
//         .get();
//       break;

//     default:
//       break;
//   }

//   const userData = async () => {
//     try {
//       const snapshot = await querySnapshot;
//       const user = Promise.all(
//         snapshot.docs.map(async (doc) => {
//           const data = doc.data();
//           const userInfo = await getUserByUserId(data.uID);
//           return { id: doc.id, data, uPhoto: userInfo[0].uPhoto };
//         })
//       );
//       setDocuments(await user);
//     } catch (error) {
//       alert(error.message);
//     }
//   };
//   userData();
//   return () => {
//     userData();
//   };
// }

// getData();
// }, [collectionName, userID, purpose]);
