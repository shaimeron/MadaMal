import { FC } from "react";
import { Control, useWatch } from "react-hook-form";
import { ImageFormInput, TextFieldFormInput } from "@@/common/formInputs";
import { EUserFields, userFormDataObject } from "../formUtils";

interface Props {
  control: Control<any>;
  isUpdateForm: boolean;
}

export const UserFormBody: FC<Props> = ({ control, isUpdateForm }) => {
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
        isDisabled={isUpdateForm}
      />
      <TextFieldFormInput
        control={control}
        formData={userFormDataObject[EUserFields.PASSWORD]}
        type="password"
        isDisabled={isUpdateForm}
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
