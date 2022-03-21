import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const PostFooter = ({ item }) => {
  let initialvalue = item.data.likes;
  let TotalnoOfLikes = initialvalue ? item.data.likes.length : 0;
  return (
    <>
      <CardContent style={{ paddingLeft: "8px", paddingTop: "0px" }}>
        <Typography variant="body1" color="text.secondary">
          {TotalnoOfLikes < 2
            ? `${TotalnoOfLikes} Like`
            : `${TotalnoOfLikes} Likes`}
        </Typography>
      </CardContent>
      <CardContent style={{ paddingLeft: "8px", paddingTop: "0px" }}>
        <Typography variant="body2" color="text.secondary">
          {item.data.caption}
        </Typography>
      </CardContent>
    </>
  );
};

export default PostFooter;
