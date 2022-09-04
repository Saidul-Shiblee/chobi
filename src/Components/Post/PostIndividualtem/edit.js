import EditIcon from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { getPost } from "../../../Firebase/getPost";
import FileUpLoaderModal from "../../Uploader/fileUploaderModal";

export default function Edit({ item, currentUser, handleMenuClose }) {
  const [openUploader, setOpenUploader] = React.useState(false);
  const [postToEdit, setPostToEdit] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const getPostToEdit = async () => {
    setLoading(true);
    const result = await getPost(item.id);
    setPostToEdit(result);
    setLoading(false);
    setOpenUploader(true);
    handleMenuClose();
  };
  const handleClose = () => {
    setOpenUploader(false);
  };

  return (
    <>
      <MenuItem onClick={getPostToEdit}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        Edit
      </MenuItem>

      {!loading && (
        <FileUpLoaderModal
          openUploader={openUploader}
          setOpenUploader={setOpenUploader}
          handleClose={handleClose}
          postToEdit={postToEdit}
          edit={true}
          id={item.id}
        />
      )}
    </>
  );
}
