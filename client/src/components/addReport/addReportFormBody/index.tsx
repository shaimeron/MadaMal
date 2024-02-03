import { FC } from "react";
import { Control } from "react-hook-form";
import { ImageFormInput, TextFieldFormInput } from "@@/common/formInputs";
import { EAddReportFields, addReportFormDataObject } from "../formUtils";

interface IAddReportFormBodyProps {
  control: Control<any>;
}

export const AddReportFormBody: FC<IAddReportFormBodyProps> = ({ control }) => {
  return (
    <>
      <TextFieldFormInput
        isMultiline
        control={control}
        formData={addReportFormDataObject[EAddReportFields.DATA]}
      />
      <ImageFormInput
        control={control}
        formData={addReportFormDataObject[EAddReportFields.IMAGE]}
      />
    </>
  );
};
