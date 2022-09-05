import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import * as React from "react";
import { projectFirestore } from "../Firebase/firebase";
import { getUserByUserId } from "../Firebase/getUserByUserId";

const useComment = (collectionName, docID) => {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    async function getData() {
      const q = query(
        collection(projectFirestore, collectionName, docID, "comments"),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = await onSnapshot(
        q,
        async (querySnapshot) => {
          const results = Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const data = doc.data();
              const userInfo = await getUserByUserId(data.userID);
              return { id: doc.id, data, user: userInfo[0] };
            })
          );
          const postComments = await results;
          if (isMounted) setComments(postComments);
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
  }, [collectionName, docID]);

  return {
    comments,
  };
};

export default useComment;
