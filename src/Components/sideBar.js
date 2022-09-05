import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import spinner from "../assets/Spinner-Big.svg";
import { useAuth } from "../Context/authcontext";
import { followsuggestion } from "../Firebase/followSuggestion";
import { getUserByUserId } from "../Firebase/getUserByUserId";
import { ToggleFollow } from "../Firebase/toggleFollow";
import AvatartWraper from "./Post/PostIndividualtem/avatartWraper";
import Suggestion from "./Sidebaritems/suggestion";

export default function MySidebar() {
  const [loading, setLoading] = React.useState(true);
  const [suggesttedFollowers, setSuggesttedFollowers] = React.useState([]);
  const [error, setError] = React.useState("");
  const { currentUser } = useAuth();
  const [currentUserPhoto, setCurrentUserPhoto] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;
    const getFollowers = async function () {
      try {
        setError("");
        let users = await followsuggestion(currentUser.uid);
        if (isMounted) setSuggesttedFollowers(users);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        setError(error);
      }
    };
    getFollowers();

    return () => {
      isMounted = false;
    };
  }, [currentUser.uid]);

  React.useEffect(() => {
    let isMounted = true;
    const getUserPhoto = async function () {
      try {
        setError("");
        let user = await getUserByUserId(currentUser.uid);

        if (isMounted) setCurrentUserPhoto(user?.[0]?.uPhoto);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        setError(error);
      }
    };
    getUserPhoto();

    return () => {
      isMounted = false;
    };
  }, [currentUser.uid]);

  const handleFollow = async (CUID, FUID) => {
    await ToggleFollow(CUID, FUID);
  };

  return loading ? (
    <Box
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        left: "-40%",
      }}
    >
      <img src={spinner} alt="Loading..." />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "280px",
        position: "fixed",
      }}
    >
      <Box sx={{ display: "flex", mb: "8px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AvatartWraper outerRing={"48px"} innerRing={"43px"}>
            <Avatar src={currentUserPhoto} imgProps={{ "aria-hidden": true }} />
          </AvatartWraper>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            ml: "8px",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", fontWeight: "bold", mb: "-4px" }}
            component="p"
          >
            {currentUser.email.split("@").shift()}
          </Typography>
          <Typography sx={{ fontSize: "10px", color: "#78909c" }} component="p">
            {currentUser.displayName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", color: "#0091ea", weight: "900" }}
            component="p"
          >
            Switch
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ fontSize: "14px", fontWeight: "bold", color: "#78909c" }}
          component="p"
        >
          Suggestion for You
        </Typography>
      </Box>

      {suggesttedFollowers.map((suggesttedFollower, index) => (
        <Suggestion
          key={index}
          currentUser={currentUser}
          suggesttedFollower={suggesttedFollower}
          handleFollow={handleFollow}
        />
      ))}
    </Box>
  );
}
