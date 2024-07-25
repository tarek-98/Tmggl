import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      onFileUpload(acceptedFiles[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #cccccc",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop a photo here, or click to select a photo</p>
    </div>
  );
};

export default FileUpload;
