import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useAuth } from "./../../../Context/authcontext";
import Delete from "./delete";
import Edit from "./edit";

export default function Options({ item }) {
  const [anchorEl, setAnchorEl] = React.useState(false);

  const menuOpen = Boolean(anchorEl);

  const { currentUser } = useAuth();

  const handleClick = (event) => {
    handleClose();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {currentUser.uid === item.data.uID && (
          <Tooltip title="Options">
            <IconButton onClick={handleClick}>
              <MoreVert fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Delete item={item} currentUser={currentUser} />
        <Edit item={item} currentUser={currentUser} />
      </Menu>
    </React.Fragment>
  );
}
