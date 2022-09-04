import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import deleteFile from "../../../Firebase/deleteFile";
import deletePost from "../../../Firebase/deletePost";
import { projectStorage } from "../../../Firebase/firebase";

export default function Delete({ item, currentUser }) {
  const handleDelete = async () => {
    try {
      //delete from database
      await deletePost("images", item.id);

      const imageURLS = !Array.isArray(item?.data?.imageURL)
        ? [item?.data?.imageURL]
        : item?.data?.imageURL;

      //delete file from storage
      imageURLS.forEach(async (URL) => {
        let storageRef = projectStorage.refFromURL(URL);
        await deleteFile(`images/${currentUser.uid}/${storageRef.name}`);
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <MenuItem onClick={handleDelete}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      Delete
    </MenuItem>
  );
}
