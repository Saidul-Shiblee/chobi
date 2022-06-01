import CardMedia from "@mui/material/CardMedia";
import * as React from "react";

const PostImage = ({ item }) => {
  return (
    <CardMedia
      //   sx={{ objectFit: "cover", width: "500px", height: "630px" ,}}
      component="img"
      image={item?.data?.imageURL}
      alt={item?.data?.uName || item?.data?.uEmail}
    ></CardMedia>
  );
};

export default PostImage;
