import Card from "@mui/material/Card";
import * as React from "react";
import useImage from "../hooks/useImage";
import PostAction from "./Post/postaction";
import PostCommentBox from "./Post/postcommentbox";
import PostComments from "./Post/postcomments";
import PostFooter from "./Post/postfooter";
import PostHeader from "./Post/postheader";
import PostImage from "./Post/postImage";

export default function Post() {
  const { documents } = useImage("images");
  const refs = React.useMemo(
    () => documents.map(() => React.createRef()),
    [documents]
  );

  return documents.map((item, index) => (
    <Card sx={{ Width: 500, mb: "20px", flex: 1 }}>
      <PostHeader item={item} />
      <PostImage item={item} />
      <PostAction item={item} commentsRef={refs[index]} />
      <PostFooter item={item} />
      <PostComments item={item} />
      <PostCommentBox item={item} commentsRef={refs[index]} />
    </Card>
  ));
}
