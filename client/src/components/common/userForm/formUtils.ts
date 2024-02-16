import { z } from "zod";
import { IFormFieldInputData } from "../../../models/form";

export enum EUserFields {
  FULL_NAME = "fullname",
  EMAIL = "email",
  PASSWORD = "password",
  IMAGE = "imageFile",
  DEFAULT_IMAGE_NAME = "defaultImageName",
}

export const userFormDataObject: Record<EUserFields, IFormFieldInputData> = {
  [EUserFields.FULL_NAME]: {
    fieldName: EUserFields.FULL_NAME,
    label: "שם מלא",
  },
  [EUserFields.EMAIL]: {
    fieldName: EUserFields.EMAIL,
    label: "אימייל",
  },
  [EUserFields.PASSWORD]: {
    fieldName: EUserFields.PASSWORD,
    label: "סיסמה",
  },
  [EUserFields.IMAGE]: {
    fieldName: EUserFields.IMAGE,
  },
  [EUserFields.DEFAULT_IMAGE_NAME]: {
    fieldName: EUserFields.DEFAULT_IMAGE_NAME,
  },
};

export const userSchema = z.object({
  [EUserFields.EMAIL]: z.string().email("כתובת המייל לא חוקית"),
  [EUserFields.FULL_NAME]: z.string().min(3, "נא להזין שם מלא"),
  [EUserFields.PASSWORD]: z
    .string()
    .min(3, "נא להזין סיסמה באורך שלושה תווים לפחות"),
  [EUserFields.IMAGE]: z.instanceof(File).optional(),
  [EUserFields.DEFAULT_IMAGE_NAME]: z.string().optional(),
});

export const defaultFormValues = {
  [EUserFields.FULL_NAME]: "",
  [EUserFields.EMAIL]: "",
  [EUserFields.PASSWORD]: "",
  [EUserFields.DEFAULT_IMAGE_NAME]: undefined,
};
export type UserFormData = z.infer<typeof userSchema>;
