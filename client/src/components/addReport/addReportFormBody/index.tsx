import {FC} from "react";
import {Control, useWatch} from "react-hook-form";
import {ImageFormInput, TextFieldFormInput} from "@@/common/formInputs";
import {addReportFormDataObject, EAddReportFields} from "../formUtils";

interface IAddReportFormBodyProps {
  control: Control<any>;
}

export const AddReportFormBody: FC<IAddReportFormBodyProps> = ({ control }) => {
  const defaultImageName = useWatch({
    control,
    name: EAddReportFields.DEFAULT_IMAGE_NAME,
  });

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
        defaultImageName={defaultImageName}
      />
    </>
  );
};
