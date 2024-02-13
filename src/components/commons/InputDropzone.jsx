/* eslint-disable react/prop-types */
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function InputDropzone({
  isName,
  isRegister,
  isRequired,
  SetDropzone,
}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
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
        SetDropzone(isName, acceptedFiles);
      },
      [isName, SetDropzone]
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
      <p
        style={{
          textAlign: "center",
          textWrap: "pretty",
          padding: "1rem 0rem",
        }}
      >
        Drag and drop some files here, or click to select files
      </p>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ width: "fit-content", margin: "0rem auto 1rem auto" }}
      >
        Upload file
        <input
          name={isName}
          {...getInputProps()}
          {...isRegister(isName, { required: isRequired })}
        />
      </Button>
      {acceptedFiles?.map((file) => (
        <img
          key={file.name}
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
