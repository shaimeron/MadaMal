import { FC } from "react";
import { Control, useWatch } from "react-hook-form";
import { ImageFormInput, TextFieldFormInput } from "@@/common/formInputs";
import { EUserFields, userFormDataObject } from "./formUtils";

export type UserFormMode = "update" | "register";

interface Props {
  control: Control<any>;
  mode: UserFormMode;
}

export const UserFormBody: FC<Props> = ({ control, mode }) => {
  const defaultImageName = useWatch({
    control,
    name: EUserFields.DEFAULT_IMAGE_NAME,
  });

  return (
    <>
      <TextFieldFormInput
        control={control}
        formData={userFormDataObject[EUserFields.FULL_NAME]}
        isDisabled={mode === "update"}
      />
      <TextFieldFormInput
        control={control}
        formData={userFormDataObject[EUserFields.EMAIL]}
      />
      <TextFieldFormInput
        control={control}
        formData={userFormDataObject[EUserFields.PASSWORD]}
        type="password"
        placeholder={mode === "register" ? "" : "********"}
        isDisabled={mode === "update"}
      />
      <ImageFormInput
        control={control}
        formData={userFormDataObject[EUserFields.IMAGE]}
        defaultImageName={defaultImageName}
      />
    </>
  );
};
