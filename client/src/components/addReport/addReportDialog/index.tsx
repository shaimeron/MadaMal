import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/store";
import { selectReportDialogStatus, closeDialog } from "@/store/addReport";
import { EAddReportFields, schema } from "../formUtils";
import { useAddDialog } from "./hooks/useAddDialog";
import { AddReportFormBody } from "../addReportFormBody";

export const AddReportDialog: FC = () => {
  const isOpen: boolean = useAppSelector(selectReportDialogStatus);
  const [defaultImageName, setDefaultImageName] = useState<string>();
  const { getReport, handeSave, titleText, submitText } = useAddDialog();
  const dispatch = useDispatch();

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const func = async () => {
      if (isOpen) {
        const report = await getReport();
        // valueRef.current.value = report ? report.data : "";
        report?.imageName && setDefaultImageName(report.imageName);
      }
    };

    func();
  }, [getReport, isOpen]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      dispatch(closeDialog());
      reset();
      setDefaultImageName(undefined);
    }
  }, [dispatch, isOpen, reset]);

  const onSubmit = useCallback(
    async (form: FieldValues): Promise<void> => {
      await handeSave(
        form[EAddReportFields.DATA],
        form[EAddReportFields.IMAGE],
        defaultImageName
      );
      handleClose();
    },
    [defaultImageName, handeSave, handleClose]
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
