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
import { EAddReportFields, schema } from "../formUtils";
import { useAddDialog } from "./hooks/useAddDialog";
import { AddReportFormBody } from "../addReportFormBody";
import { IReport } from "@/models";

export const AddReportDialog: FC = () => {
  const isOpen: boolean = useAppSelector(selectReportDialogStatus);
  const { getReport, handeSave, titleText, submitText } = useAddDialog();
  const dispatch = useDispatch();

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const func = async () => {
      if (isOpen) {
        const report: IReport | undefined = await getReport();
        if (report) {
          reset({
            values: {
              [EAddReportFields.DATA]: report.data,
              [EAddReportFields.DEFAULT_IMAGE_NAME]: report.imageName,
            },
          });
        }
      }
    };

    func();
  }, [getReport, isOpen, reset]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      dispatch(closeDialog());
      reset();
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
