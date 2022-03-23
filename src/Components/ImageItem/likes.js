import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as React from "react";
import ToggleLikes from "../../Firebase/togglelikes";

export default function Likes({ item }) {
  let initialvalue = item.data.likes;
  let TotalnoOfLikes = initialvalue ? item.data.likes.length : 0;
  const currentUser = { uid: "userID" };
  let likedPhoto = initialvalue
    ? item.data.likes.includes(currentUser.uid)
      ? true
      : false
    : null;

  let [noOflikes, setNoOflikes] = React.useState(TotalnoOfLikes);
  const [toggleLiked, setToggleLiked] = React.useState(likedPhoto);

  const handleLikes = async () => {
    try {
      setToggleLiked((toggleLiked) => !toggleLiked);

      //

      await ToggleLikes("images", item.id, toggleLiked, currentUser.uid);

      setNoOflikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    } catch (error) {
      console.log(error);
    }
  };

  return likedPhoto ? (
    <FavoriteIcon onClick={handleLikes} style={{ color: "red" }} />
  ) : (
    <FavoriteBorderIcon onClick={handleLikes} />
  );
}
