import PagesIcon from "@mui/icons-material/Pages";
import { Box, Chip, Divider } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import * as React from "react";
import IndividualImage from "./individualimage";
const ProfileBody = ({ documents }) => {
  return (
    <Box>
      <Divider
        sx={{ width: "100%", marginTop: "10px", marginBottom: "30px" }}
        flexItem
      >
        <Chip
          label="POSTS"
          icon={<PagesIcon />}
          variant="outlined"
          sx={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.70)" }}
        />
      </Divider>
      <ImageList cols={3} rowHeight={292} gap={30}>
        {documents.map((doc) => (
          <ImageListItem>
            <IndividualImage imageURL={doc.data.imageURL} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ProfileBody;
