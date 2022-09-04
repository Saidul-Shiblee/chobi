import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box className="navItem">
      <Link to="timeline" style={{ textDecoration: "none" }}>
        <IconButton size="small">
          <HomeOutlinedIcon />
        </IconButton>
      </Link>
    </Box>
  );
};

export default Home;
