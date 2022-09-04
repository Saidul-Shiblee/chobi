import Box from "@mui/material/Box";
import * as React from "react";

import AllPosts from "../Components/allPosts";
import SideBar from "../Components/sideBar.js";

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
            display: "flex",
            flexDirection: "column",
            width: "60%",
            position: "relative",
          }}
        >
          <AllPosts />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            position: "relative",
            width: "40%",
            pl: "25px",
            pt: "50px",
          }}
        >
          <SideBar />
        </Box>
      </Box>
    </React.Fragment>
  );
}
