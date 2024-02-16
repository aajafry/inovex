/* eslint-disable react/prop-types */
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function InputDropzone({
  isName,
  isRegister,
  isRequired,
  setDropzone,
}) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    maxSize: 1024 * 5000,
    onDrop: useCallback(
      (acceptedFiles) => {
        if (acceptedFiles?.length) {
          acceptedFiles.map((file) => {
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          });
        }
        setDropzone(isName, acceptedFiles);
      },
      [isName, setDropzone]
    ),
  });

  return (
    <Box
      {...getRootProps()}
      style={{
        backgroundColor: "#EEF5FF",
        margin: "1rem 0rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box 
        style={{
          textAlign: "center",
          textWrap: "pretty",
          padding: "1rem 0rem",
        }}
      >
        { isDragActive ?
          <Typography variant="body"> 
            Drop the files here ...
          </Typography> :
          <Typography variant="body"> 
            Drag & drop some files here, or click to select files
          </Typography>
        }
    </Box>
      
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      sx={{ width: "fit-content", margin: "0rem auto 1rem auto" }}
    >
      Upload
      <input
        name={isName}
        {...getInputProps()}
        {...isRegister(isName, { required: isRequired })}
      />
    </Button>

    {acceptedFiles?.map((file, index) => (
      <img
        key={index}
        src={file.preview}
        alt={file.name}
        style={{
          height: "340px",
          margin: "1rem 0rem",
        }}
      />
    ))}
  </Box>
  );
}
