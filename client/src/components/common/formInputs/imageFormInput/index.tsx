import { FC, useCallback, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { IFormFieldInput } from "@/models/form";
import { Box, CardMedia } from "@mui/material";
import { serverURL } from "@/api";
import { style } from "@@/userPage/userPage/style";
import { TextFieldFormInput } from "..";

interface IImageFormInputProps extends IFormFieldInput {
  defaultImageName?: string;
}

export const ImageFormInput: FC<IImageFormInputProps> = ({
  control,
  formData,
  defaultImageName,
}) => {
  const [selectedImageToDisplay, setSelectedImageToDisplay] =
    useState<string>();

  const selectedImage = useWatch({
    control,
    name: formData.fieldName,
  });

  const handleImageChange = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageToDisplay(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImageToDisplay("");
    }
  }, []);

  useEffect(() => {
    handleImageChange(selectedImage);
  }, [handleImageChange, selectedImage]);

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
      <TextFieldFormInput control={control} formData={formData} type="file" />
    </Box>
  );
};
