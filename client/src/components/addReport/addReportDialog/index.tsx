import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/store";
import { selectReportDialogStatus, closeDialog } from "@/store/addReport";
import {
  AddReportFormData,
  EAddReportFields,
  defaultFormValues,
  schema,
} from "../formUtils";
import { useAddDialog } from "./hooks/useAddDialog";
import { AddReportFormBody } from "../addReportFormBody";

export const AddReportDialog: FC = () => {
  const isOpen: boolean = useAppSelector(selectReportDialogStatus);
  const { getReportForForm, handeSave, titleText, submitText } = useAddDialog();
  const dispatch = useDispatch();

  const { handleSubmit, control, reset } = useForm<AddReportFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  useEffect(() => {
    const func = async () => {
      if (isOpen) {
        const reportForForm = await getReportForForm();
        reset(reportForForm);
      }
    };

    func();
  }, [getReportForForm, isOpen, reset]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      reset();
      dispatch(closeDialog());
    }
  }, [dispatch, isOpen, reset]);

  const onSubmit = useCallback(
    async (form: FieldValues): Promise<void> => {
      await handeSave(
        form[EAddReportFields.DATA],
        form[EAddReportFields.IMAGE],
        form[EAddReportFields.DEFAULT_IMAGE_NAME]
      );
      handleClose();
    },
    [handeSave, handleClose]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <AddReportFormBody control={control} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleClose}>
          בטל
        </Button>
        <Button variant="contained" color="success" type="submit">
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
