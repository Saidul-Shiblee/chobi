import { Avatar, Box, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import * as React from "react";
import { getUserByUserId } from "../../Firebase/getUserByUserId";
import filterObject from "./../Settings/Utils/utils";

const ProfileHeader = ({ id, noOfPost }) => {
  const [user, setUser] = React.useState({});
  console.log(user);
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByUserId(id);
        const filteredUser = filterObject(
          user,
          "uName",
          "uPhoto",
          "following",
          "followers"
        );
        console.log(user);
        setUser(filteredUser);
      } catch (error) {
        alert(error);
      }
    };
    fetchUser();
    return () => {
      fetchUser();
    };
  }, [id]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: "25px",
        width: "61.5%",
      }}
    >
      <Box sx={{ maxWidth: "30%" }}>
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
            width: 150,
            height: 150,
            cursor: "pointer",
          }}
          src={user.uPhoto}
        ></Avatar>
      </Box>
      <Box sx={{ flexGrow: 1, maxWidth: "70%", pl: "100px" }}>
        <Box>
          <Typography variant="h4" sx={{ color: "rgba(0, 0, 0, 0.70)" }}>
            {user.uName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", my: "20px" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              mr: "30px",
              color: "rgba(0, 0, 0, 0.70)",
            }}
          >
            {noOfPost} {noOfPost > 1 ? "posts" : "post"}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              mr: "30px",
              color: "rgba(0, 0, 0, 0.70)",
            }}
          >
            {user?.followers?.length}{" "}
            {user?.followers?.length > 1 ? "followers" : "follower"}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              mr: "30px",
              color: "rgba(0, 0, 0, 0.70)",
            }}
          >
            {user?.following?.length} following
          </Typography>
        </Box>

        <Box></Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
