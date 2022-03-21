import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import * as React from "react";
import { projectFirestore } from "../Firebase/firebase";

const useImage = (collectionName) => {
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const q = query(
        collection(projectFirestore, collectionName),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = await onSnapshot(
        q,
        (querySnapshot) => {
          const results = [];
          querySnapshot.forEach((result) => {
            results.push({ id: result.id, data: result.data() });
          });
          setDocuments(results);
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
  }, [collectionName]);

  return {
    documents,
  };
};

export default useImage;
