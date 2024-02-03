import { TextField } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { IFormFieldInput } from "@/models/form";

interface ITextFieldFormInputProps extends IFormFieldInput {
  isMultiline?: boolean;
  type?: React.HTMLInputTypeAttribute;
}

export const TextFieldFormInput: FC<ITextFieldFormInputProps> = ({
  control,
  formData,
  isMultiline = false,
  type = "text",
}) => {
  return (
    <Controller
      name={formData.fieldName}
      control={control}
      render={({
        field: { name, onChange, value, disabled },
        fieldState: { error },
      }) => (
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          type={type}
          maxRows={4}
          multiline={isMultiline}
          sx={formData.sxStyle}
          label={formData.label ?? ""}
          name={name}
          disabled={disabled}
          value={value ?? ""}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
