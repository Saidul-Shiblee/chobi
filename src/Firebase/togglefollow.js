import { app, FieldValue, projectFirestore } from "./firebase";

const ToggleFollow = async (currentUserID, followedUserID) => {
  const isExist = await isExistsInList(currentUserID, followedUserID);

  projectFirestore
    .collection("users")
    .doc(currentUserID)
    .update({
      following: isExist
        ? FieldValue.arrayUnion(followedUserID)
        : FieldValue.arrayRemove(followedUserID),
    });

  projectFirestore
    .collection("users")
    .doc(followedUserID)
    .update({
      followers: isExist
        ? FieldValue.arrayUnion(currentUserID)
        : FieldValue.arrayRemove(currentUserID),
    });
};
async function isExistsInList(CUID, FUID) {
  const result = await app
    .firestore()
    .collection("users")
    .where("uID", "==", CUID)
    .where("following", "array-contains", FUID)
    .get();

  const userExist = result.docs.map((item) => item.data());

  if (userExist.length === 0) return true;
  return false;
}
export { ToggleFollow };
