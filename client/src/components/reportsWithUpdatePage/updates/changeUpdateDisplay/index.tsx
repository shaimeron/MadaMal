import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import {api} from "@/api";
import {style} from "./style";
import {zodResolver} from "@hookform/resolvers/zod";
import {Control, FieldValues, useForm} from "react-hook-form";
import {
    AddUpdateFormData,
    addUpdateFormDataObject,
    defaultFormValues,
    EAddUpdateFields,
    schema,
} from "../utils/formUtils";
import {toast} from "react-toastify";
import {LoadingButton} from "@mui/lab";
import {TextFieldFormInput} from "@@/common/formInputs";

interface IChangeUpdateDisplayProps {
  reportId: string;
  updateData: string;
  updateId: string;
  closeUpdate: () => void;
}

export const ChangeUpdateDisplay: FC<IChangeUpdateDisplayProps> = ({
  reportId,
  updateData,
  updateId,
  closeUpdate,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const { handleSubmit, control, reset } = useForm<AddUpdateFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  useEffect(() => {
    reset({ data: updateData });
  }, [reset]);

  const changeUpdateData = useCallback(
    async (dataOfUpdate: string): Promise<void> =>
      await api.report.changeUpdateInReport({
        reportId,
        data: dataOfUpdate,
        _id: updateId,
      }),
    [reportId, updateId]
  );

  const handleClose = useCallback((): void => {
    reset();
    closeUpdate();
  }, [closeUpdate, reset]);

  const onSubmit = useCallback(
    async (form: FieldValues): Promise<void> => {
      try {
        setIsButtonLoading(true);
        await changeUpdateData(form[EAddUpdateFields.DATA]);
        reset();
        toast.success("העדכון שונה בהצלחה");
        handleClose();
      } catch (error) {
        toast.error("אירעה שגיאה בשינוי העדכון");
      } finally {
        setIsButtonLoading(false);
      }
    },
    [changeUpdateData, handleClose, reset]
  );

  return (
    <Card sx={style.cardContainer}>
      <CardContent sx={style.cardContent}>
        <TextFieldFormInput
          isMultiline
          control={control as unknown as Control}
          formData={addUpdateFormDataObject[EAddUpdateFields.DATA]}
        />
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={isButtonLoading}
          role="progressbar"
          variant="contained"
          color="success"
          sx={style.changeButtom}
          onClick={handleSubmit(onSubmit)}
        >
          <span>שנה</span>
        </LoadingButton>
        <Button variant="contained" color="error" onClick={handleClose}>
          בטל
        </Button>
      </CardActions>
    </Card>
  );
};
