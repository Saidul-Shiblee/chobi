import Card from "@mui/material/Card";
import * as React from "react";
import { useAuth } from "../Context/authcontext";
import useImage from "../Hooks/useImage";
import PostAction from "./Post/postaction";
import PostCommentBox from "./Post/postcommentbox";
import PostComments from "./Post/postcomments";
import PostFooter from "./Post/postfooter";
import PostHeader from "./Post/postheader";
import PostImages from "./Post/postImages";

export default function Post() {
  const { currentUser } = useAuth();
  const { documents } = useImage("users", currentUser.uid, "post");
  const refs = React.useMemo(
    () => documents.map(() => React.createRef()),
    [documents]
  );

  return documents.map((item, index) => (
    <Card
      key={item.id}
      variant="outlined"
      sx={{ Width: 500, mb: "20px", flex: 1 }}
    >
      <PostHeader item={item} />
      <PostImages item={item} />
      <PostAction item={item} commentsRef={refs[index]} />
      <PostFooter item={item} />
      <PostComments item={item} currentUser={currentUser} />
      <PostCommentBox item={item} commentsRef={refs[index]} />
    </Card>
  ));
}
