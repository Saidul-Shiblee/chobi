import Box from "@mui/material/Box";
import * as React from "react";
import ImageList from "../Components/imagelist copy";
import MySidebar from "../Components/mysidebar.js";

export default function TimeLine() {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: "38%",
          }}
        >
          <ImageList />
        </Box>
        <Box
          sx={{
            left: "70%",
            position: "fixed",
            ml: "30px",
            mt: "30px",
          }}
        >
          <MySidebar sx={{ maxWidth: "300px" }} />
        </Box>
      </Box>
    </React.Fragment>
  );
}
