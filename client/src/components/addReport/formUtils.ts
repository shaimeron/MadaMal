import { z } from "zod";
import { IFormFieldInputData } from "@/models/form";

export enum EAddReportFields {
  IMAGE = "imageFile",
  DATA = "data",
}

export const addReportFormDataObject: Record<
  EAddReportFields,
  IFormFieldInputData
> = {
  [EAddReportFields.IMAGE]: {
    fieldName: EAddReportFields.IMAGE,
  },
  [EAddReportFields.DATA]: {
    fieldName: EAddReportFields.DATA,
    label: "דיווח",
  },
};

export const schema = z.object({
  [EAddReportFields.IMAGE]: z.instanceof(File).optional(),
  [EAddReportFields.DATA]: z.string({
    required_error: "חובה למלא את טקסט הדיווח",
  }),
});

export type FormData = z.infer<typeof schema>;
