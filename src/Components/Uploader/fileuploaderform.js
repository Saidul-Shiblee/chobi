import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

const FileUpLoaderForm = ({ setImageURL, setFiles }) => {
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  //Supported files type
  const types = ["image/png", "image/jpeg"];

  //Function to handle fille change
  const handleChange = (e) => {
    let selectedFiles = [...e.target.files];
    console.log(selectedFiles);
    let noOfFiles = selectedFiles.length;
    // let totalFileSize = getProperty(selectedFiles, "size");
    let fileTypes = getProperty(selectedFiles, "type");
    // let fileNames = getProperty(selectedFiles, "name");
    let supportedTypes = chekForValidFileType(types, fileTypes);

    if (!supportedTypes || !noOfFiles) {
      console.log(supportedTypes);
      setError("No file Selected or file type is not supported");
      return setOpen(true);
    } else {
      setError("");
      setFiles(selectedFiles);
      const urls = [];
      selectedFiles.forEach((selectedFile) => {
        const url = URL.createObjectURL(selectedFile);
        urls.push(url);
      });
      setImageURL(urls);
    }
  };

  //function to get properties of selected file
  function getProperty(array, propertyName) {
    switch (propertyName) {
      case "size":
        let fileSize = 0;
        array.forEach((file) => {
          fileSize = fileSize + file.size;
        });
        return fileSize;

      case "name":
        let fileTypes = [];
        array.forEach((file) => {
          fileTypes.push(file.name);
        });
        return fileTypes;

      case "type":
        let FileNames = [];
        array.forEach((file) => {
          FileNames.push(file.type);
        });
        return FileNames;

      default:
        break;
    }
  }
  //function to chekc the valid file format
  function chekForValidFileType(validFileTypes, TypesToCheck) {
    let isValid = true;
    for (let i of TypesToCheck) {
      if (!validFileTypes.includes(i)) {
        isValid = false;
        return isValid;
      }
    }
    return isValid;
  }

  //Error message snackbar handler
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: "50px" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <input
        style={{ display: "none" }}
        accept="image/*"
        id="for-post"
        multiple
        type="file"
        onChange={handleChange}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
      <label htmlFor="for-post">
        <AddAPhotoOutlinedIcon />
      </label>
    </>
  );
};

export default FileUpLoaderForm;
