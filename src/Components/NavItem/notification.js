import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Box, IconButton } from "@mui/material";

const Notification = () => {
  return (
    <Box className="navItem">
      <IconButton size="large">
        <Badge badgeContent={4} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Notification;
