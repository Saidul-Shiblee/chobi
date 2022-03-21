import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function CircularProgressWithLabel({ value }) {
  return (
    <Box>
      <CircularProgress
        sx={{ width: "60px", height: "60px" }}
        variant="determinate"
        thickness={5}
        value={value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="white">
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
