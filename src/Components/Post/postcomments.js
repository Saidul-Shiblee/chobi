import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useComment from "../../hooks/useComments";

const PostComments = ({ item }) => {
  const { comments } = useComment("images", item.id);
  console.log(comments);
  return comments.map((comment) => (
    <CardContent
      key={comment.id}
      style={{ paddingLeft: "8px", paddingTop: "0px" }}
    >
      <Typography variant="body2" color="text.secondary">
        {`${comment.data.userID}: ${comment.data.description}`}
      </Typography>
    </CardContent>
  ));
};

export default PostComments;
