import Box from "@mui/material/Box";
import * as React from "react";
import FileUpLoaderForm from "../Uploader/fileuploaderform";
import ProgressList from "./progresslist";

const FileUpLoader = () => {
  const [files, setFiles] = React.useState([]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      ustifyContent="center"
      alignItems="center"
    >
      <FileUpLoaderForm setFiles={setFiles} files={files} />
      <ProgressList files={files} />
    </Box>
  );
};

export default FileUpLoader;
