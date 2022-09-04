import { Avatar, TextField, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/login.png";
import { useAuth } from "../Context/authcontext";
import createUser from "../Firebase/createUser";
import useFormValidation from "../Hooks/useFormValidation";

const Signup = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const { signup, update } = useAuth();
  const [values, error, setError, handleChange, handleBlur, handleSubmit] =
    useFormValidation(submit, setOpen);
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

  async function submit(event) {
    try {
      setLoading(true);
      let userInfo = await signup(values.email, values.password);
      await update(values.name);
      const userData = {
        uID: userInfo?.user.uid,
        uEmail: userInfo?.user.email,
        name: userInfo?.user.displayName,
        uName: userInfo?.user.email.split("@").shift(),
        following: [
          "yjeXL4DcO0eWUkY1uXHnKmZoHrB2",
          "7LkEY0pMOlOrZeB6AwGib877tsk2",
        ],
        followers: [
          "yjeXL4DcO0eWUkY1uXHnKmZoHrB2",
          "k6jDg549PLb2pN4yosSnLDuOLx03",
          "gKTnoveozXRuFIOmK6k4dOSQpx33",
        ],
        website: "",
        bio: "",
        phoneNo: "",
        gender: "",
      };

      await createUser("users", userData, userInfo.user.uid);
      setLoading(false);
      neviagate("/timeline");
    } catch (err) {
      setLoading(false);
      setError({
        ...error,
        firebaseError: err.message,
      });
      return setOpen(true);
    }
  }

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
          {Array.from(Object.values(error)).map((err, index) => (
            <p key={index}> {err}</p>
          ))}
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
                disabled={open}
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                autoComplete="userName"
              />
              <TextField
                margin="normal"
                disabled={open}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                disabled={open}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onBlur={handleBlur}
                autoComplete="current-password"
                onChange={handleChange}
                value={values.password}
              />
              <TextField
                margin="normal"
                disabled={open}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="Confirm Password"
                onBlur={handleBlur}
                autoComplete="current-password"
                onChange={handleChange}
                value={values.confirmPassword}
              />
              <Button
                disabled={
                  loading ||
                  open ||
                  !values.userName ||
                  !values.email ||
                  !values.password ||
                  !values.confirmPassword
                }
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>

          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/signin">Already have an account? </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
