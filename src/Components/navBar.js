import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAuth } from "../Context/authcontext";
import Account from "./Nav/account";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.2)",
  position: "fixed",
  top: "0",
  zIndex: 99,
}));

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function NavBar() {
  const { currentUser } = useAuth();

  return !currentUser ? null : (
    <>
      <StyledAppBar>
        <Container maxWidth="lg">
          <Toolbar
            className="myToolbar"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <IconButton size="large" edge="start" sx={{ mr: 2 }}>
                <CameraRoundedIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "rgba(0, 0, 0, 0.70)" }}
              >
                Chobi
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Account />
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Offset sx={{ mb: "5px" }} />
    </>
  );
}
