import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Accounts() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: 4,
      }}
    >
      <Paper
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          width: "70%",
        }}
        variant="outlined"
        elevation={0}
      >
        <Box
          className="tabItem"
          sx={{
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <NavLink to="edit" style={{ textDecoration: "none" }}>
            Edit Profile
          </NavLink>
          <NavLink to="changepassword" style={{ textDecoration: "none" }}>
            Change Password
          </NavLink>
        </Box>
        <Box style={{ width: "80%" }}>
          <Outlet></Outlet>
        </Box>
      </Paper>
    </Box>
  );
}
