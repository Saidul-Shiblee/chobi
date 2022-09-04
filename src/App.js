import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/navBar";
import ProtectedRoutes from "./Components/Routes/protectedRoute";
import PublicRoute from "./Components/Routes/publicRoute";
import ChangePassword from "./Components/Settings/changePassword";
import ProfileEdit from "./Components/Settings/profileEdit";
import { Authprovider } from "./Context/authcontext";
import Accounts from "./Pages/accounts";
import Explore from "./Pages/explore";
import Profile from "./Pages/profile";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import TimeLine from "./Pages/timeline";

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Authprovider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="explore" element={<Explore />} />
            <Route basename="/" path="profile/:id" element={<Profile />} />
            <Route path="timeline" element={<TimeLine />} />
            <Route path="accounts" element={<Accounts />}>
              <Route index element={<ProfileEdit />} />
              <Route path="edit" element={<ProfileEdit />} />
              <Route path="changepassword" element={<ChangePassword />} />
            </Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Authprovider>
    </React.Fragment>
  );
}
