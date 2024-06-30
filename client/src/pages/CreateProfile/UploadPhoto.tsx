import React, { useContext, useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";

import Context from "../..";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 6px 12px; // Уменьшил размеры padding
  font-size: 14px; // Уменьшил шрифт
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 5px;
`;

interface Store {
  uploadAvatar: (file: File | null) => void;
}

interface ContextType {
  store: Store;
}

interface UploadPhotoInterface {
  externalFile?: File;
  externalSetFile?: (File: File | null) => void;
}

const UploadPhoto: React.FC<UploadPhotoInterface> = ({
  externalFile,
  externalSetFile,
}) => {
  const { store } = useContext(Context) as ContextType;
  const [internalFile, internalSetFile] = useState<File | null>(null);
  console.log(externalFile, externalSetFile);
  var file: File | null, setFile: (arg0: File | null) => void;
  if (externalFile !== undefined && externalSetFile !== undefined) {
    file = externalFile;
    setFile = externalSetFile;
    console.log("penis");
  } else {
    [file, setFile] = [internalFile, internalSetFile];
    console.log("penis");

  }

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Container>
      <StyledInput
        type="file"
        id="photo"
        onChange={handleFileChange}
        ref={fileInputRef}
        accept="image/*"
      />
      <StyledLabel htmlFor="photo">Choose Photo</StyledLabel>
      {preview && <ImagePreview src={preview} alt="Uploaded Preview" />}
      {externalFile === undefined && externalSetFile === undefined && (
        <StyledButton
          onClick={() => {
            store.uploadAvatar(file);
            console.log("Photo uploaded!");
          }}
          disabled={!file}
        >
          Upload
        </StyledButton>
      )}
    </Container>
  );
};

export default UploadPhoto;
