import { Avatar, Box, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import useComment from "../../Hooks/useComments";

const PostComments = ({ item, currentUser }) => {
  const { comments } = useComment("images", item.id);

  return comments.map((comment) => (
    <CardContent
      key={comment.id}
      style={{ paddingLeft: "8px", paddingTop: "0px" }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ marginRight: "5px" }}>
          <Avatar
            src={comment?.user?.uPhoto}
            imgProps={{ "aria-hidden": true }}
            sx={{ width: "25px", height: "25px" }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ fontWeight: "bold", marginRight: "2px" }}
          >{`${comment?.user?.uName}:`}</Typography>

          <Typography>{`${comment?.data?.description}`}</Typography>
        </Box>
      </Box>
    </CardContent>
  ));
};

export default PostComments;
