import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import SettingsInputSvideoRoundedIcon from "@mui/icons-material/SettingsInputSvideoRounded";
import { Avatar, Box, Divider, Snackbar, Tooltip } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/authcontext";

const UserMenu = () => {
  const { signout, currentUser } = useAuth();

  const neviagate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const [error, setError] = React.useState();

  async function handleSignout() {
    try {
      setError("");
      await signout();
      neviagate("/signin");
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
            <Avatar
              src={currentUser.otherInfo[0].uPhoto}
              sx={{ width: "25px", height: "25px" }}
            />
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
