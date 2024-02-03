import { z } from "zod";
import { IFormFieldInputData } from "@/models/form";

export enum EAddReportFields {
  IMAGE = "imageFile",
  DATA = "data",
  DEFAULT_IMAGE_NAME = "defaultImageName",
}

export const addReportFormDataObject: Record<
  EAddReportFields,
  IFormFieldInputData
> = {
  [EAddReportFields.IMAGE]: {
    fieldName: EAddReportFields.IMAGE,
  },
  [EAddReportFields.DEFAULT_IMAGE_NAME]: {
    fieldName: EAddReportFields.DEFAULT_IMAGE_NAME,
  },
  [EAddReportFields.DATA]: {
    fieldName: EAddReportFields.DATA,
    label: "דיווח",
  },
};

export const schema = z.object({
  [EAddReportFields.IMAGE]: z.instanceof(File).optional(),
  [EAddReportFields.DEFAULT_IMAGE_NAME]: z.string().optional(),
  [EAddReportFields.DATA]: z.string({
    required_error: "חובה למלא את טקסט הדיווח",
  }),
});

export const defaultFormValues = {
  [EAddReportFields.DATA]: "",
  [EAddReportFields.DEFAULT_IMAGE_NAME]: "",
};
export type AddReportFormData = z.infer<typeof schema>;
