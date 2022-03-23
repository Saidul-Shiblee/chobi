import { collection, onSnapshot, query, where } from "firebase/firestore";
import * as React from "react";
import { projectFirestore } from "../Firebase/firebase";
import { getUserByUserId } from "../Firebase/getUser";

const useImage = (collectionName, userID) => {
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const user = await getUserByUserId(userID);
      const data = user[0];

      const imageRef = collection(projectFirestore, "images");
      const q = query(
        imageRef,
        where("uID", "in", [...data.following, userID])
      );

      const unsubscribe = await onSnapshot(
        q,
        (querySnapshot) => {
          const results = [];
          querySnapshot.forEach((result) => {
            results.push({ id: result.id, data: result.data() });
          });
          setDocuments(results);
          console.log(results);
        },
        (error) => {
          alert(error.message);
        }
      );

      return () => {
        unsubscribe();
      };
    }

    getData();
  }, [collectionName, userID]);

  return {
    documents,
  };
};

export default useImage;
