import { doc, getDoc } from "firebase/firestore";
import { projectFirestore } from "./firebase";

export async function getPost(postId) {
  const postRef = doc(projectFirestore, "images", postId);
  const post = await getDoc(postRef);
  return new Promise((resolve, reject) => {
    resolve(post.data());
  });
}
