import {FC, useCallback, useState} from "react";
import {Card, CardContent} from "@mui/material";
import {style} from "./style";
import {api} from "@/api";
import SendIcon from "@mui/icons-material/Send";
import {
    AddUpdateFormData,
    addUpdateFormDataObject,
    defaultFormValues,
    EAddUpdateFields,
    schema,
} from "../utils/formUtils";
import {zodResolver} from "@hookform/resolvers/zod";
import {Control, FieldValues, useForm} from "react-hook-form";
import {TextFieldFormInput} from "@@/common/formInputs";
import {toast} from "react-toastify";
import {LoadingButton} from "@mui/lab";

interface IAddUpdateToReportProps {
  reportId: string;
  userId: string;
}

export const AddUpdateToReport: FC<IAddUpdateToReportProps> = ({
  reportId,
  userId,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const { handleSubmit, control, reset } = useForm<AddUpdateFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const addNewUpdate = useCallback(
    async (dataToAdd: string): Promise<void> =>
      await api.report.addUpdateToReport({
        reportId,
        data: dataToAdd,
        ownerId: userId,
      }),
    [reportId, userId]
  );

  const onSubmit = useCallback(
    async (form: FieldValues): Promise<void> => {
      try {
        setIsButtonLoading(true);
        await addNewUpdate(form[EAddUpdateFields.DATA]);
        reset();
        toast.success("העדכון נוצר בהצלחה");
      } catch (error) {
        toast.error("אירעה שגיאה ביצירת העדכון");
      } finally {
        setIsButtonLoading(false);
      }
    },
    [addNewUpdate, reset]
  );

  return (
    <Card sx={style.cardContainer}>
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <TextFieldFormInput
            isMultiline
            control={control as unknown as Control}
            formData={addUpdateFormDataObject[EAddUpdateFields.DATA]}
          />

          <LoadingButton
            loading={isButtonLoading}
            role="progressbar"
            variant="outlined"
            type="submit"
            endIcon={<SendIcon sx={{ transform: "rotateY(180deg)" }} />}
          >
            <span>הוסף עדכון</span>
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
};
