import FilterNoneTwoToneIcon from "@mui/icons-material/FilterNoneTwoTone";
import { Box } from "@mui/material";
import * as React from "react";
import MultipleImageShow from "./mulipleimageshow";

const IndividualImage = ({ imageURL }) => {
  const [imgURL, setImgURL] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (data) => {
    setImgURL(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImgURL([]);
  };

  return (
    <Box sx={{ position: "relative", width: "290px", height: "290px" }}>
      <img
        src={imageURL[0]}
        key={imageURL[0]}
        alt={imageURL[0]}
        style={{ width: "290px", height: "290px", cursor: "pointer" }}
        onClick={() => handleClickOpen(imageURL)}
      />

      {imageURL.length > 1 && (
        <FilterNoneTwoToneIcon
          size="small"
          sx={{
            fontSize: "medium",
            position: "absolute",
            top: "0",
            right: "0",
            color: "#f5f5f5 ",
            cursor: "pointer",
          }}
        />
      )}
      <MultipleImageShow
        imgURL={imgURL}
        handleClose={handleClose}
        open={open}
      />
    </Box>
  );
};

export default IndividualImage;
