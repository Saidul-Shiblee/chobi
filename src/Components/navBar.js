import CameraIcon from "@mui/icons-material/Camera";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Account from "./NavItem/account";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.2)",
  position: "fixed",
  top: "0",
  zIndex: 99,
}));

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function NavBar() {
  return (
    <>
      <StyledAppBar>
        <Container maxWidth="lg" id="1111">
          <Toolbar
            className="myToolbar"
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
            style={{ padding: "0px" }}
          >
            <IconButton size="large" edge="start" sx={{ mr: 2 }}>
              <CameraIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "rgba(0, 0, 0, 0.70)" }}
            >
              Chobi
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
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
