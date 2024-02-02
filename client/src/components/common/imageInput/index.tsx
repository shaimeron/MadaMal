import React, { useState } from "react";
import { Box, CardMedia } from "@mui/material";
import { serverURL } from "../../../api";
import { style } from "./style";

interface ImageInputProps {
  onImageSelected: (file?: File) => void;
  defaultImageName?: string;
}
export const ImageInput: React.FC<ImageInputProps> = ({
  onImageSelected,
  defaultImageName,
}) => {
  const [selectedImageToDisplay, setSelectedImageToDisplay] =
    useState<string>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onImageSelected(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageToDisplay(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImageToDisplay("");
    }
  };

  return (
    <Box sx={style.boxContainer}>
      {(selectedImageToDisplay || defaultImageName) && (
        <CardMedia
          component="img"
          alt="Preview"
          src={
            selectedImageToDisplay
              ? selectedImageToDisplay
              : `${serverURL}/${defaultImageName}`
          }
          sx={style.img}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginTop: "10px", direction: "rtl" }}
      />
    </Box>
  );
};
