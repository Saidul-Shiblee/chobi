import { FieldValue, projectFirestore } from "./firebase";

const ToggleLikes = (collectionName, docID, toggleLiked, userID) => {
  projectFirestore
    .collection(collectionName)
    .doc(docID)
    .update({
      likes: toggleLiked
        ? FieldValue.arrayRemove(userID)
        : FieldValue.arrayUnion(userID),
    });
};

export default ToggleLikes;
