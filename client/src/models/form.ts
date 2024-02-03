import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { Control } from "react-hook-form";

export interface IFormFieldInputData {
  label?: string;
  sxStyle?: SxProps<Theme>;
  fieldName: string;
}

export interface IFormFieldInput {
  control: Control;
  formData: IFormFieldInputData;
}
