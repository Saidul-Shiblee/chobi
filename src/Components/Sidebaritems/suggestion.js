import { Avatar, Box, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import * as React from "react";
import { Link } from "react-router-dom";
const Suggestion = ({ currentUser, suggesttedFollower, handleFollow }) => {
  console.log(suggesttedFollower);

  const [following, setFollowing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const follow = async () => {
    if (!following) {
      await handleFollow(currentUser.uid, suggesttedFollower.uID);
      setFollowing(true);
    } else {
      setOpen(true);
    }
  };

  const unFollow = async () => {
    if (following) {
      await handleFollow(currentUser.uid, suggesttedFollower.uID);

      setFollowing(false);
      setOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: "8px",
        justifyContent: "center",
        py: "8px",
      }}
    >
      <Box sx={{ display: "flex", mb: "8px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 24,
              height: 24,
              cursor: "pointer",
            }}
            src={suggesttedFollower.uPhoto}
          >
            {suggesttedFollower.uName.charAt(0)}
          </Avatar>
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
          <Link
            to={`../profile/${suggesttedFollower.uID}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                mb: "-4px",
                cursor: "pointer",
              }}
              component="p"
            >
              {suggesttedFollower.uName}
            </Typography>
          </Link>
          <Typography sx={{ fontSize: "10px", color: "#78909c" }} component="p">
            Follows you
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
            sx={{
              fontSize: "12px",
              color: "#0091ea",
              weight: "900",
              cursor: "pointer",
            }}
            component="p"
            onClick={follow}
          >
            {following ? "Following" : "Follow"}
          </Typography>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          </Box>
          <Box>
            <DialogTitle id="alert-dialog-title">
              {`Unfollow ${suggesttedFollower.uName}`}
            </DialogTitle>
          </Box>
          <Box>
            <Typography
              sx={{
                cursor: "pointer",
              }}
              onClick={unFollow}
            >
              {" "}
              Unfollow
            </Typography>
          </Box>
          <Box>
            <Divider />
          </Box>

          <Box>
            <Typography
              sx={{
                cursor: "pointer",
              }}
              onClick={handleClose}
            >
              {" "}
              Cancel
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Suggestion;
