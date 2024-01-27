import React, { useState } from "react";
import { Avatar } from "@mui/material";

interface ImageInputProps {
  onImageSelected: (file?: File) => void;
}
export const ImageInput: React.FC<ImageInputProps> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onImageSelected(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {selectedImage && (
        <Avatar
          alt="Profile"
          src={selectedImage}
          sx={{ width: 100, height: 100 }}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginLeft: "10px" }}
      />
    </>
  );
};
