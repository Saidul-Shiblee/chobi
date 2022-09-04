import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as React from "react";
import { useAuth } from "../../../Context/authcontext";
import ToggleLikes from "../../../Firebase/toggleLikes";

export default function Likes({ item }) {
  const { currentUser } = useAuth();
  let initialvalue = item.data.likes;

  let likedPhoto = initialvalue
    ? item.data.likes.includes(currentUser.uid)
      ? true
      : false
    : null;

  const [toggleLiked, setToggleLiked] = React.useState(likedPhoto);

  const handleLikes = async () => {
    try {
      setToggleLiked((toggleLiked) => !toggleLiked);
      await ToggleLikes("images", item.id, toggleLiked, currentUser.uid);
    } catch (error) {
      alert(error);
    }
  };

  return likedPhoto ? (
    <FavoriteIcon onClick={handleLikes} style={{ color: "red" }} />
  ) : (
    <FavoriteBorderIcon onClick={handleLikes} />
  );
}
