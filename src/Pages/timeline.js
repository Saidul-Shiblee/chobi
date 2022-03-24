import Box from "@mui/material/Box";
import * as React from "react";
import FileUpLoader from "../Components/fileuploader";
import ImageList from "../Components/imagelist copy";
import MySidebar from "../Components/mysidebar.js";
import NavBar from "../Components/navBar";

export default function TimeLine() {
  return (
    <React.Fragment>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FileUpLoader />
        <Box
          sx={{
            display: "flex",
            width: "1200px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageList />
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <MySidebar />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
