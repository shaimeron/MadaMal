import { FC } from "react";
import { Control, useWatch } from "react-hook-form";
import { ImageFormInput, TextFieldFormInput } from "@@/common/formInputs";
import { EUserFields, userFormDataObject } from "./formUtils";

type UserFormMode = "update" | "register";

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
      />
      <TextFieldFormInput
        control={control}
        formData={userFormDataObject[EUserFields.EMAIL]}
        isDisabled={mode === "update"}
      />
      <TextFieldFormInput
        control={control}
        formData={userFormDataObject[EUserFields.PASSWORD]}
        type="password"
        isDisabled={mode === "update"}
        labelOverride="*******"
      />
      <ImageFormInput
        control={control}
        formData={userFormDataObject[EUserFields.IMAGE]}
        defaultImageName={defaultImageName}
      />
    </>
  );
};
