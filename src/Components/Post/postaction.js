import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import CardActions from "@mui/material/CardActions";
import Likes from "../ImageItem/likes";
const PostAction = ({ commentsRef, item }) => {
  const focusInput = () => {
    commentsRef.current.focus();
  };
  return (
    <CardActions style={{ paddingLeft: "7px" }}>
      <Likes item={item} />
      <ChatOutlinedIcon onClick={focusInput} style={{ cursor: "pointer" }} />
    </CardActions>
  );
};

export default PostAction;
