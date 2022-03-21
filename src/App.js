// import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
// import Signin from "./Pages/signin";
// import FileUpLoader from "./Components/fileuploader";
// import ImageList from "./Components/imagelist copy";
// import NavBar from "./Components/navBar";
import { Authprovider } from "./context/authcontext";
import Signup from "./Pages/siginup";

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Authprovider>
        {/* <Signin /> */}
        <Signup />
        {/* <NavBar />

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
      </Container> */}

        {/* <NavBar />
      
      <ImageContainer /> */}
      </Authprovider>
    </React.Fragment>
  );
}
