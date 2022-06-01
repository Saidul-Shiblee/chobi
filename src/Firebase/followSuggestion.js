import { getUserByUserId } from "./getUserByUserId";

export async function followsuggestion(userID) {
  const user = await getUserByUserId(userID);
  const followersList = user[0].followers;
  const followingList = user[0].following;

  const filteredList = [];

  for (let item of followersList) {
    if (!followingList.includes(item)) {
      filteredList.push(item);
    }
  }

  const followUsers = Promise.all(
    filteredList.map(async (item) => {
      const user = await getUserByUserId(item);
      const { uEmail, uID, uName, uPhoto } = user[0];
      return { uEmail, uID, uName, uPhoto };
    })
  );
  return followUsers;
}
