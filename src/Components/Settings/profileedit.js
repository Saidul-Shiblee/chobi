import { Avatar, Snackbar, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import * as React from "react";
import uid from "react-uuid";
import { useAuth } from "../../Context/authcontext";
import { getUserByUserId } from "../../Firebase/getUserByUserId";
import UpdateUser from "../../Firebase/updateUser";
import uploadFile from "../../Firebase/uplopadFile";
import MyCropper from "../Cropper/mycropper";
import getCroppedImg from "../Cropper/Utils/cropimage";
import filterObject from "./Utils/utils";
const ProfileEdit = () => {
  const { currentUser } = useAuth();
  const [files, setFiles] = React.useState([]);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState(0);
  const [zoom, setZoom] = React.useState(1);
  const [croppedImage, setCroppedImage] = React.useState(null);
  const [urls, Seturls] = React.useState([]);
  const [open, setOpen] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const [values, setValues] = React.useState({
    name: "",
    uName: "",
    website: "",
    bio: "",
    phoneNo: "",
    gender: "",
    uPhoto: "",
  });

  React.useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");
        const user = await getUserByUserId(currentUser.uid);
        setLoading(false);
        const filteredUser = filterObject(
          user,
          "bio",
          "gender",
          "name",
          "phoneNo",
          "uName",
          "website",
          "uPhoto"
        );

        if (isMounted) setValues(filteredUser);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [currentUser.uid]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFiles = (e) => {
    let selectedFiles = [...e.target.files];

    setFiles(files);
    const urls = [];
    selectedFiles.forEach((selectedFile) => {
      const url = URL.createObjectURL(selectedFile);
      urls.push(url);
    });
    Seturls(urls);
    setOpen(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const result = await UpdateUser(currentUser.uid, values);
    setMessage(result);
    setSnackbarOpen(true);
    setLoading(false);
  };

  const onClose = React.useCallback(() => {
    setCroppedImage(null);
    setOpen(false);
    setFiles([]);
    Seturls([]);
    setRotation(0);
    setZoom(1);
    URL.revokeObjectURL(urls);
  }, [urls]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const croppedImage = await getCroppedImg(
        urls,
        croppedAreaPixels,
        rotation
      );
      if (croppedImage == null) {
        throw new Error("No Files to Upload");
      }

      const fileInfo = [];

      const file = croppedImage.file;

      const imageName = uid() + "." + file.name.split(".").pop();

      fileInfo.push({
        file,
        imageName,
        path: `profilePic/${currentUser.uid}`,
      });

      let results = await uploadFile(fileInfo);
      setValues({ ...values, uPhoto: results[0] });

      await UpdateUser(currentUser.uid, { uPhoto: results[0] });
      setLoading(false);
      setFiles([]);
      setOpen(false);
    } catch (e) {
      alert(e);
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: "50px" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={
            message === "Information Updated Successfully" ? "success" : "error"
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
              width: "20%",
            }}
          >
            <Avatar
              sx={{
                width: 50,
                height: 50,
                cursor: "pointer",
              }}
              src={values.uPhoto}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <Typography variant="h6">{values.uName}</Typography>

            <input
              style={{ display: "none" }}
              accept="image/*"
              id="for-profilePic"
              type="file"
              onChange={handleFiles}
              onClick={(event) => {
                event.target.value = null;
              }}
            />

            <label
              style={{
                color: "#0095f6",
                cursor: "pointer",
                fontSize: "16px",
              }}
              htmlFor="for-profilePic"
            >
              Change Profile Photo
            </label>
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
              width: "20%",
            }}
          >
            <Typography>Name:</Typography>
          </Box>

          <Box
            id="0000"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              size="small"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
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
              width: "20%",
            }}
          >
            <Typography>Username:</Typography>
          </Box>

          <Box
            id="0000"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              size="small"
              value={values.uName}
              name="uName"
              onChange={handleChange}
            />
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
              width: "20%",
            }}
          >
            <Typography>Website:</Typography>
          </Box>

          <Box
            id="0000"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              size="small"
              name="website"
              value={values.website}
              onChange={handleChange}
            />
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
              width: "20%",
            }}
          >
            <Typography>Bio:</Typography>
          </Box>

          <Box
            id="0000"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              multiline
              maxRows={4}
              name="bio"
              value={values.bio}
              onChange={handleChange}
            />
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
              width: "20%",
            }}
          >
            <Typography>Phone No.:</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              size="small"
              name="phoneNo"
              value={values.phoneNo}
              onChange={handleChange}
            />
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
              width: "20%",
            }}
          >
            <Typography>Gender:</Typography>
          </Box>

          <Box
            id="0000"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.gender}
                name="gender"
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
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
              width: "20%",
            }}
          ></Box>

          <Box
            id="0000"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
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
                onClick={handleUpdate}
              >
                Update
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

            <MyCropper
              onCropComplete={onCropComplete}
              handleSave={handleSave}
              crop={crop}
              setCrop={setCrop}
              zoom={zoom}
              setZoom={setZoom}
              rotation={rotation}
              setRotation={setRotation}
              open={open}
              urls={urls[0]}
              onClose={onClose}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileEdit;
