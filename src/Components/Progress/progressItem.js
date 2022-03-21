import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Box } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import * as React from "react";
import uid from "react-uuid";
import addToDB from "../../Firebase/addtodb";
import uploadFile from "../../Firebase/uplopadFile";
import CircularProgressWithLabel from "./circularprogress";

export default function ImagesList({ file }) {
  console.log(file);
  const [progress, setProgress] = React.useState(0);
  const [imageURL, setImageURL] = React.useState(null);
  const currentUser = { uid: "userID" };
  React.useEffect(() => {
    const imageName = uid() + "." + file.name.split(".").pop();
    const uploadImage = async () => {
      try {
        const url = await uploadFile(
          file,
          `images/${currentUser.uid}`,
          imageName,
          setProgress
        );

        const imageObj = {
          imageURL: url,
          uID: currentUser.uid,
          caption: "",
          uEmail: "",
          uName: "",
          uPhoto: "",
          uLatitude: "",
          uLongitude: "",
        };
        await addToDB("images", imageObj, imageName);

        setImageURL(null);
      } catch (error) {
        console.log(error);
      }
    };

    setImageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file, currentUser.uid]);
  return (
    imageURL && (
      <ImageListItem rows={1} cols={1} sx={{ overflow: "hidden" }}>
        <img src={imageURL} alt={imageURL} loading="lazy" />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          {progress < 100 ? (
            <CircularProgressWithLabel value={`${Math.floor(progress)}%`} />
          ) : (
            <CheckCircleOutlineOutlinedIcon
              sx={{ width: "60px", height: "60px", color: "lightgreen" }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
}
