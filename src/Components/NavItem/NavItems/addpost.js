import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import FileUpLoaderModal from "../../Uploader/fileuploadermodal";

export default function AddPost() {
  const [openUploader, setOpenUploader] = React.useState(false);

  const handleClickOpen = () => {
    setOpenUploader(true);
  };

  const handleClose = () => {
    setOpenUploader(false);
  };

  return (
    <>
      <Box className="navItem">
        <IconButton size="small" onClick={handleClickOpen}>
          <AddAPhotoOutlinedIcon />
        </IconButton>
      </Box>
      <FileUpLoaderModal
        openUploader={openUploader}
        setOpenUploader={setOpenUploader}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </>
  );
}
