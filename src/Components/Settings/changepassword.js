import { Avatar, Button, TextField, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { deepOrange, green } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { getUserByUserId } from "../../Firebase/getUserByUserId";
import { useAuth } from "./../../Context/authcontext";
import filterObject from "./Utils/utils";

const ChangePassword = () => {
  const { currentUser, changePassword } = useAuth();
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [values, setValues] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  console.log(values);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByUserId(currentUser.uid);
        const filteredUser = filterObject(user, "uName", "uPhoto");
        setUser(filteredUser);
      } catch (error) {
        alert(error);
      }
    };
    fetchUser();
    return () => {
      fetchUser();
    };
  }, [currentUser.uid]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handlePasswordChange = async () => {
    try {
      const { oldPassword, newPassword, confirmPassword } = values;
      if (
        oldPassword !== "" &&
        newPassword !== "" &&
        newPassword === confirmPassword
      ) {
        setMessage("");
        setLoading(true);
        let result = await changePassword(
          currentUser,
          currentUser.email,
          oldPassword,
          newPassword
        );
        console.log(result);
        setLoading(false);
        setMessage(result);
        setValues({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: "50px" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={
            message === "Password updated successfully" ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
            mb: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
            }}
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: 40,
                height: 40,
                cursor: "pointer",
              }}
              src={user.uPhoto}
            ></Avatar>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{user.uName}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
            }}
          >
            <Typography>Old Password:</Typography>
          </Box>

          <Box
            id="0000"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <TextField
              name="oldPassword"
              type="password"
              value={values.oldPassword}
              onChange={handleChange}
              fullWidth
              id="fullWidth"
              size="small"
            />
          </Box>
        </Box>

        {/*  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
            }}
          >
            <Typography>New Password:</Typography>
          </Box>

          <Box
            id="0000"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <TextField
              type="password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              fullWidth
              id="fullWidth"
              size="small"
            />
          </Box>
        </Box>
        {/*  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
            }}
          >
            <Typography>Confirm New Password:</Typography>
          </Box>

          <Box
            id="0000"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <TextField
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              fullWidth
              id="fullWidth"
              size="small"
              onChange={handleChange}
            />
          </Box>
        </Box>
        {/*  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
            }}
          ></Box>

          {/* <Box
            
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              onClick={handlePasswordChange}
            >
              Change Password
            </Button>
          </Box> */}
          <Box
            sx={{
              m: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              onClick={handlePasswordChange}
            >
              Change Password
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
