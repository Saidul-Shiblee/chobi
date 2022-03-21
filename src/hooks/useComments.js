import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import * as React from "react";
import { projectFirestore } from "../Firebase/firebase";

const useComment = (collectionName, docID) => {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const q = query(
        collection(projectFirestore, collectionName, docID, "comments"),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = await onSnapshot(
        q,
        (querySnapshot) => {
          const results = [];
          querySnapshot.forEach((result) => {
            results.push({ id: result.id, data: result.data() });
          });
          setComments(results);
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
  }, [collectionName, docID]);

  return {
    comments,
  };
};

export default useComment;
