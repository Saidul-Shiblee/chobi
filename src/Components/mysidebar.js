import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function MySidebar() {
  return (
    <Paper elevation={0}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", mb: "8px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              ml: "8px",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "bold", mb: "-4px" }}
              component="p"
            >
              msi.shiblee
            </Typography>
            <Typography sx={{ fontSize: "10px" }} component="p">
              shiblee
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "12px" }} component="p">
              Follow
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body1" component="p">
            Suggestion for You
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: "8px",
            justifyContent: "center",
            py: "8px",
          }}
        >
          <Box sx={{ display: "flex", mb: "8px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
                N
              </Avatar>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                ml: "8px",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "12px", fontWeight: "bold", mb: "-4px" }}
                component="p"
              >
                msi.shiblee
              </Typography>
              <Typography sx={{ fontSize: "10px" }} component="p">
                shiblee
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "12px" }} component="p">
                Follow
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", mb: "8px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
                N
              </Avatar>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                ml: "8px",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "12px", fontWeight: "bold", mb: "-4px" }}
                component="p"
              >
                msi.shiblee
              </Typography>
              <Typography sx={{ fontSize: "10px" }} component="p">
                shiblee
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "12px" }} component="p">
                Follow
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", mb: "8px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
                N
              </Avatar>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                ml: "8px",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "12px", fontWeight: "bold", mb: "-4px" }}
                component="p"
              >
                msi.shiblee
              </Typography>
              <Typography sx={{ fontSize: "10px" }} component="p">
                shiblee
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "12px" }} component="p">
                Follow
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
