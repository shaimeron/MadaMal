import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useCallback } from "react";
import { FC } from "react";
import { selectUserId } from "../../store/user";
import { useAppSelector } from "../../hooks/store";
import { api } from "../../api";
import { closeDialog, selectReportDialog } from "../../store/addReport";
import { useDispatch } from "react-redux";

export const AddReportDialog: FC = () => {
  const { isOpen } = useAppSelector(selectReportDialog);
  const userId: string = useAppSelector(selectUserId);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  const handeSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      const reportData = formJson.reportData;
      await api.report.addReport({
        data: reportData,
        ownerId: userId,
      });
      handleClose();
    },
    [handleClose, userId]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handeSubmit,
      }}
    >
      <DialogTitle>צור דיווח חדש</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name="reportData"
          label="דיווח"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>בטל</Button>
        <Button type="submit">שמור</Button>
      </DialogActions>
    </Dialog>
  );
};
