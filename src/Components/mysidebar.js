import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAuth } from "../Context/authcontext";
import { followsuggestion } from "../Firebase/followSuggestion";
import { ToggleFollow } from "../Firebase/togglefollow";
import Suggestion from "./Sidebaritems/suggestion";

export default function MySidebar() {
  const [loading, setLoading] = React.useState(true);
  const [suggesttedFollowers, setSuggesttedFollowers] = React.useState([]);
  const [error, setError] = React.useState("");
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const getFollowers = async function () {
      try {
        setError("");
        let users = await followsuggestion(currentUser.uid);
        setSuggesttedFollowers(users);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError(error);
      }
    };
    getFollowers();

    return () => {
      getFollowers();
    };
  }, [currentUser.uid]);

  const handleFollow = async (CUID, FUID) => {
    await ToggleFollow(CUID, FUID);
  };

  return loading ? (
    "loading"
  ) : (
    <Box sx={{ display: "flex", flexDirection: "column", width: "280px" }}>
      <Box sx={{ display: "flex", mb: "8px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>S</Avatar>
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
            {currentUser.email}
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
