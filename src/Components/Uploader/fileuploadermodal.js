import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import TextField from "@mui/material/TextField";
import * as React from "react";
import uid from "react-uuid";
import { useAuth } from "../../Context/authcontext";
import createPost from "../../Firebase/createPost";
import { projectStorage, timestamp } from "../../Firebase/firebase";
import UpdatePost from "../../Firebase/updatePost";
import uploadFile from "../../Firebase/uplopadFile";
import CircularProgressWithLabel from "../Progress/circularProgress";
import deleteFile from "./../../Firebase/deleteFile";
import FileUpLoaderForm from "./fileUploaderForm";

export default function FileUploderModal({
  openUploader,
  handleClose,
  postToEdit,
  edit,
  id,
}) {
  let initialImageURL = postToEdit?.imageURL ? postToEdit.imageURL : [];
  let initialCaption = postToEdit?.caption ? postToEdit.caption : "";

  const { currentUser } = useAuth();
  const [files, setFiles] = React.useState([]);
  const [imageURL, setImageURL] = React.useState(initialImageURL);
  const [caption, setCaption] = React.useState(initialCaption);
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [fileToDelete, setFileToDelet] = React.useState([]);

  const handleChange = (e) => {
    setCaption(e.target.value);
  };

  //function to close modal and clear data
  const closeModalAndClearData = () => {
    setFiles([]);
    setImageURL([]);
    setCaption("");
    setProgress(0);
    setLoading(false);
    handleClose();
  };
  //function to remove image from seleceted images
  const removeImage = (index) => {
    let newImageURL = [...imageURL];
    let newFiles = [...files];
    if (index !== -1) {
      setFileToDelet([...fileToDelete, newImageURL[index]]);
      newImageURL.splice(index, 1);
      setImageURL(newImageURL);
      newFiles.splice(index, 1);
      setFiles(newFiles);
    }
  };

  //function to upload files and save the files to database
  const handleShare = async () => {
    if (!edit && files.length === 0) {
      throw new Error("No Files to Upload");
    }
    setLoading(true);
    const fileInfo = [];
    files.forEach((file) => {
      const imageName = uid() + "." + file.name.split(".").pop();
      fileInfo.push({
        file,
        imageName,
        path: `images/${currentUser.uid}`,
      });
    });
    //upload files in both case of update and create
    let results = await uploadFile(fileInfo, setProgress);

    //delete files incase of update

    if (edit) {
      let filterFiletoDelete = [];
      fileToDelete.forEach((image) => {
        if (!image.startsWith("blob")) {
          filterFiletoDelete.push(image);
        }
      });

      filterFiletoDelete.forEach(async (URL) => {
        let storageRef = projectStorage.refFromURL(URL);
        await deleteFile(`images/${currentUser.uid}/${storageRef.name}`);
      });
    }

    //create new post
    let filteredURL = [];
    imageURL.forEach((image) => {
      if (!image.startsWith("blob")) {
        filteredURL.push(image);
      }
    });

    let imgObj = edit
      ? {
          imageURL: [...filteredURL, ...results],
          caption: caption,
          updated: true,
          timestamp,
        }
      : {
          imageURL: results,
          uID: currentUser.uid,
          caption: caption,
          uEmail: currentUser.email,
          uName: currentUser.displayName,
          uPhoto: currentUser.photoURL,
          uLatitude: "",
          uLongitude: "",
        };

    edit
      ? await UpdatePost(id, imgObj)
      : await createPost("images", imgObj, uid());
    setFiles([]);
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={openUploader}
        onClose={closeModalAndClearData}
        TransitionComponent={Transition}
      >
        {!loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              minHeight: "400px",
            }}
          >
            <Box
              sx={{
                height: "50px",
                width: "full",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "10px",
              }}
            >
              <Box>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={closeModalAndClearData}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="close"
                  size="small"
                >
                  <FileUpLoaderForm
                    setFiles={setFiles}
                    setImageURL={setImageURL}
                    files={files}
                    imageURL={imageURL}
                  />
                </IconButton>
              </Box>
              <Box>
                <Button autoFocus color="inherit" onClick={handleShare}>
                  {edit ? "UPDATE" : "SHARE"}
                </Button>
              </Box>
            </Box>
            <Box></Box>
            {(files.length > 0 || imageURL.length > 0) && (
              <Box sx={{ mb: "20px" }}>
                <TextField
                  fullWidth
                  id="standard-textarea"
                  label="Give a caption..."
                  multiline
                  variant="standard"
                  value={caption}
                  onChange={handleChange}
                />
              </Box>
            )}

            <Box>
              <ImageList cols={3} rowHeight={180} gap={5}>
                {imageURL.map((item, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={`${item}`}
                      // srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item}
                      loading="lazy"
                      style={{
                        width: "175px",
                        height: "175px",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        top: 2,
                        right: 9,
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        edge="start"
                        sx={{
                          color: "White",
                          backgroundColor: "rgb(0,0,0,.15)",
                        }}
                        aria-label="close"
                        onClick={() => removeImage(index)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Box>
        )}

        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              minHeight: "400px",
            }}
          >
            {progress < 100 ? (
              <CircularProgressWithLabel value={Math.floor(progress)} />
            ) : (
              <CheckCircleOutlineOutlinedIcon
                sx={{ width: "60px", height: "60px", color: "lightgreen" }}
              />
            )}
            <Box
              sx={{
                top: 0,
                right: 0,
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                edge="start"
                sx={{ color: "black" }}
                aria-label="close"
                onClick={closeModalAndClearData}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Dialog>
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});
