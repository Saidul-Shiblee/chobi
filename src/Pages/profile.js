import { Box } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import ProfileBody from "../Components/ProfileItems/profileBody";
import ProfileHeader from "../Components/ProfileItems/profileHeader";
import useImage from "../Hooks/useImage";

const Profile = () => {
  let { id } = useParams();

  const { documents } = useImage("users", id, "profile");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ProfileHeader id={id} noOfPost={documents.length} />

      <ProfileBody documents={documents} />
    </Box>
  );
};

export default Profile;
