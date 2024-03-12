import {z} from "zod";
import {IFormFieldInputData} from "@/models/form";

export enum EAddUpdateFields {
  DATA = "data",
}

export const addUpdateFormDataObject: Record<
  EAddUpdateFields,
  IFormFieldInputData
> = {
  [EAddUpdateFields.DATA]: {
    fieldName: EAddUpdateFields.DATA,
    sxStyle: { mb: 3 },
    placeholder: "מה העדכון שלך?",
  },
};

export const schema = z.object({
  [EAddUpdateFields.DATA]: z.string().min(1, "חובה למלא את טקסט העדכון"),
});

export const defaultFormValues = {
  [EAddUpdateFields.DATA]: "",
};
export type AddUpdateFormData = z.infer<typeof schema>;
