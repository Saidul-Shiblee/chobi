import { Avatar, TextField, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
// import { useNavigate } from "react-router-dom";
import signupImage from "../assets/login.png";
import { useAuth } from "../context/authcontext";
import addUser from "../Firebase/addUser";

const Signup = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const { signup, update } = useAuth();
  //   const neviagate = useNavigate();

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
    if (values.password !== values.confirmPassword) {
      setValues({ ...values, error: "Passwords don't match " });
      return setOpen(true);
    }
    try {
      setValues({ ...values, error: "" });
      setLoading(true);

      let userInfo = await signup(values.email, values.password);

      await update(values.name);

      const userData = {
        uID: userInfo.user.uid,
        uEmail: userInfo.user.email,
        uName: userInfo.user.displayName,
        following: [],
        followers: [],
      };

      await addUser("users", userData, userInfo.user.uid);
      setLoading(false);
      //   neviagate("/");
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
              src={signupImage}
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                onChange={handleChange}
                value={values.name}
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={values.email}
                autoComplete="email"
                autoFocus
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
                onChange={handleChange}
                value={values.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="Confirm Password"
                autoComplete="current-password"
                onChange={handleChange}
                value={values.confirmPassword}
              />
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
