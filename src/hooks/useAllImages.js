import { collection, onSnapshot } from "firebase/firestore";
import * as React from "react";
import { projectFirestore } from "../Firebase/firebase";

const useAllImages = () => {
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const imageRef = collection(projectFirestore, "images");
      const unsubscribe = onSnapshot(
        imageRef,
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
      return () => unsubscribe();
    }
    getData();
  }, []);

  return {
    documents,
  };
};

export default useAllImages;
