import { Divider, Link, TextField, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import GI from "../assets/gi.png";
import signinImage from "../assets/login.png";
import { useAuth } from "../context/authcontext";

const Signin = () => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    error: "",
  });
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const { signin, currentUser } = useAuth();
  console.log(currentUser);
  const neviagate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setValues({ ...values, error: "" });
      setLoading(true);
      await signin(values.email, values.password);
      neviagate("/timeline");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setValues({ ...values, error: error.message });
      return setOpen(true);
    }
  }
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Box
      sx={{
        background: "#f2f4f8",
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: "50px" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {values.error}
        </Alert>
      </Snackbar>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: "16px" }}
        width="90%"
      >
        <Grid item xs={12} md={6}>
          <Box>
            <img
              src={signinImage}
              width=""
              alt={"illustration"}
              style={{ maxWidth: "80%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Chobi
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
              <Grid container sx={{ my: "20px" }}>
                <Grid item xs sx={{ position: "relative" }}>
                  <Divider />
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{
                      position: "absolute",
                      right: "50%",
                      transform: "translateX(50%)",
                      top: "-10px",
                      backgroundColor: "white",
                      color: "#5F5F5F",
                    }}
                  >
                    OR
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ my: "20px" }}>
                <Grid
                  item
                  xs
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "5px",
                    }}
                    src={GI}
                    alt={"google icon"}
                  />
                  <Link
                    href="#"
                    variant="body1"
                    fontWeight="bold"
                    style={{ textDecoration: "none", color: "#5F5F5F" }}
                  >
                    Sign in with Google
                  </Link>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signin;
