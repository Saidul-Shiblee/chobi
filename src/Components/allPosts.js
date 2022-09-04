import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import spinner from "../assets/Spinner-Big.svg";
import { useAuth } from "../Context/authcontext";
import useImage from "../Hooks/useImage";
import PostAction from "./Post/postAction";
import PostCommentBox from "./Post/postCommentBox";
import PostComments from "./Post/postComments";
import PostFooter from "./Post/postFooter";
import PostHeader from "./Post/postHeader";
import PostImages from "./Post/postImages";

export default function AllPosts() {
  const { currentUser } = useAuth();
  const { documents, loading } = useImage("users", currentUser.uid, "post");
  const refs = React.useMemo(
    () => documents.map(() => React.createRef()),
    [documents]
  );

  let content = loading ? (
    <Box
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={spinner} alt="Loading..." />
    </Box>
  ) : (
    documents.map((item, index) => (
      <Card
        key={item.id}
        variant="outlined"
        sx={{
          mb: "20px",
          display: "flex",
          flexDirection: "column",
          width: "60%",
          height: "full",
          alignSelf: "end",
        }}
      >
        <PostHeader item={item} />
        <Box style={{ position: "relative", width: "full", height: "584px" }}>
          <PostImages item={item} />
        </Box>
        <PostAction item={item} commentsRef={refs[index]} />
        <PostFooter item={item} />
        <PostComments item={item} currentUser={currentUser} />
        <PostCommentBox item={item} commentsRef={refs[index]} />
      </Card>
    ))
  );
  return content;
}
