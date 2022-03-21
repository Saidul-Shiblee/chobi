import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./Components/Routes/protectedroute";
import PublicRoute from "./Components/Routes/publicroute";
import { Authprovider } from "./context/authcontext";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import TimeLine from "./Pages/timeline";

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Authprovider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/timeline" element={<TimeLine />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
        </Routes>
      </Authprovider>
    </React.Fragment>
  );
}
