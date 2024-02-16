import { IFormFieldInputData } from "@/models/form";
import { z } from "zod";

export enum ELoginFields {
  EMAIL = "email",
  PASSWORD = "password",
}

export const loginFormDataObject: Record<ELoginFields, IFormFieldInputData> = {
  [ELoginFields.EMAIL]: {
    fieldName: ELoginFields.EMAIL,
    label: "כתובת מייל",
  },
  [ELoginFields.PASSWORD]: {
    fieldName: ELoginFields.PASSWORD,
    label: "סיסמה",
  },
};

export const schema = z.object({
  [ELoginFields.EMAIL]: z.string().email("כתובת המייל לא חוקית"),
  [ELoginFields.PASSWORD]: z.string(),
});

export const defaultFormValues = {
  [ELoginFields.EMAIL]: "",
  [ELoginFields.PASSWORD]: "",
};
export type LoginFormData = z.infer<typeof schema>;
