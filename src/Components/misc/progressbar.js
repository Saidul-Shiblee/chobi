import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import * as React from "react";

const ProgressBar = () => {
  const value = 50;
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ width: "80%" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              value
            )}%`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressBar;
