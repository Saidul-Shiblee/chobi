import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <Box className="navItem">
      <Link to="explore" style={{ textDecoration: "none" }}>
        <IconButton size="small">
          <ExploreOutlinedIcon />
        </IconButton>
      </Link>
    </Box>
  );
};

export default Explore;
