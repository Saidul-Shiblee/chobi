import { Box } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import useImage from "../Hooks/useImage";
import ProfileBody from "./../Components/profileItems/profilebody";
import ProfileHeader from "./../Components/profileItems/profileheader";

const Profile = () => {
  const { id } = useParams();
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
