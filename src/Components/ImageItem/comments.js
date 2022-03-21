import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import * as React from "react";
import uid from "react-uuid";
import addComment from "../../Firebase/addcomment";

const Comments = ({ item }) => {
  const [value, setValue] = React.useState("");
  console.log(value);
  const currentUser = { uid: "userID" };
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
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add a comment.."
        inputProps={{ "aria-label": "search google maps" }}
        onChange={handleChange}
        value={value}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={handleComment}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default Comments;
