import Container from "@mui/material/Container";
import * as React from "react";
import FileUpLoader from "../Components/fileuploader";
import ImageList from "../Components/imagelist copy";
import NavBar from "../Components/navBar";

export default function TimeLine() {
  return (
    <React.Fragment>
      <NavBar />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FileUpLoader />
        <ImageList />
      </Container>
    </React.Fragment>
  );
}
