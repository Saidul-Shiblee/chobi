import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import * as React from "react";
import uid from "react-uuid";
import { useAuth } from "../../Context/authcontext";
import addComment from "../../Firebase/addComment";

const PostCommentBox = ({ commentsRef, item }) => {
  const [value, setValue] = React.useState("");
  const { currentUser } = useAuth();
  let cID = uid();

  const data = {
    description: value,
    userID: currentUser.uid,
  };

  const handleComment = async () => {
    try {
      await addComment("images", data, item.id, cID);
      setValue("");
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <Paper
      component="form"
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        maxWidth: 500,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add a comment.."
        inputProps={{ "aria-label": "search google maps" }}
        inputRef={commentsRef}
        onChange={handleChange}
        value={value}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={handleComment}
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        disabled={value === ""}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default PostCommentBox;
