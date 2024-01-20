import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { FC } from "react";
import { useAppSelector } from "../../hooks/store";
import { closeDialog, selectReportDialogStatus } from "../../store/addReport";
import { useDispatch } from "react-redux";
import { useAddDialog } from "./hooks/useAddDialog";

export const AddReportDialog: FC = () => {
  const isOpen: boolean = useAppSelector(selectReportDialogStatus);
  const { getReportData, handeSave, titleText, submitText } = useAddDialog();
  const dispatch = useDispatch();
  const valueRef: React.Ref<any> = useRef("");

  useEffect(() => {
    const func = async () => {
      if (isOpen) {
        const data = await getReportData();
        valueRef.current.value = data;
      }
    };

    func();
  }, [getReportData, isOpen]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      dispatch(closeDialog());
      valueRef.current.value = "";
    }
  }, [dispatch, isOpen]);

  const handeSubmit = useCallback(
    async (event: any): Promise<void> => {
      event.preventDefault();
      await handeSave(valueRef.current.value);
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
        onSubmit: handeSubmit,
      }}
    >
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          maxRows={4}
          autoFocus
          required
          margin="dense"
          name="reportData"
          label="דיווח"
          inputRef={valueRef}
        />
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
