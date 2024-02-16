import { FC } from "react";
import { Control } from "react-hook-form";
import { TextFieldFormInput } from "@@/common/formInputs";
import { ELoginFields, loginFormDataObject } from "./formUtils";

interface Props {
  control: Control<any>;
}

export const LoginFormBody: FC<Props> = ({ control }) => {
  return (
    <>
      <TextFieldFormInput
        control={control}
        formData={loginFormDataObject[ELoginFields.EMAIL]}
      />
      <TextFieldFormInput
        control={control}
        formData={loginFormDataObject[ELoginFields.PASSWORD]}
        type="password"
      />
    </>
  );
};
