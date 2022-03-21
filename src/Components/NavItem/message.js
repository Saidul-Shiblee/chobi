import MailIcon from "@mui/icons-material/Mail";
import { Badge, Box, IconButton } from "@mui/material";

const Message = () => {
  return (
    <Box className="navItem">
      <IconButton size="large">
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Message;
