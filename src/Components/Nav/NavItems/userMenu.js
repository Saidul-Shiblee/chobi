import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import SettingsInputSvideoRoundedIcon from "@mui/icons-material/SettingsInputSvideoRounded";
import { Avatar, Box, Divider, Snackbar, Tooltip } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { deepOrange } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/authcontext";
import { getUserByUserId } from "../../../Firebase/getUserByUserId";
import AvatartWraper from "./../../Post/PostIndividualtem/avatartWraper";

const UserMenu = () => {
  const { signout, currentUser } = useAuth();
  const [currentUserPhoto, setCurrentUserPhoto] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const neviagate = useNavigate();

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  async function handleSignout() {
    try {
      setError("");
      await signout();
      neviagate("/signin", { state: "open" });
    } catch (error) {
      setError(error.message);
      return setOpen(true);
    }
  }

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box className="navItem">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: "50px" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Box>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} size="small">
            <AvatartWraper outerRing={"28px"} innerRing={"26px"}>
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: 24,
                  height: 24,
                  cursor: "pointer",
                }}
                src={currentUserPhoto}
              ></Avatar>
            </AvatartWraper>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <AccountCircleOutlinedIcon sx={{ fontSize: "medium", mr: "10px" }} />

          <Link
            to={`profile/${currentUser.uid}`}
            style={{ textDecoration: "none" }}
          >
            <Typography textAlign="center">Profile</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu} className="userMenu">
          <SettingsInputSvideoRoundedIcon
            sx={{ fontSize: "medium", mr: "10px" }}
          />
          <Link to="accounts">
            <Typography textAlign="center">Settings</Typography>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignout} className="userMenu">
          <ExitToAppOutlinedIcon sx={{ fontSize: "medium", mr: "10px" }} />
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
