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
import { selectUserId } from "../../store/user";
import { useAppSelector } from "../../hooks/store";
import { api } from "../../api";
import { closeDialog, selectReportDialog } from "../../store/addReport";
import { useDispatch } from "react-redux";
import { IReport } from "../../models";

export const AddReportDialog: FC = () => {
  const { isOpen, selectedReportId } = useAppSelector(selectReportDialog);
  const userId: string = useAppSelector(selectUserId);
  const dispatch = useDispatch();
  const valueRef: React.Ref<any> = useRef(""); //creating a refernce for TextField Component

  const getReportData = useCallback(async () => {
    if (selectedReportId) {
      const currReport: IReport = await api.report.getById(selectedReportId);
      valueRef.current.value = currReport.data;
    } else {
      valueRef.current.value = "";
    }
  }, [selectedReportId]);

  useEffect(() => {
    const func = async () => {
      if (isOpen) await getReportData();
      else valueRef.current.value = "";
    };

    func();
  }, [getReportData, isOpen]);
  const handleClose = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  const addNewReport = useCallback(
    async (): Promise<void> =>
      await api.report.addReport({
        data: valueRef.current.value,
        ownerId: userId,
      }),
    [userId]
  );

  const updateReport = useCallback(
    async (): Promise<void> =>
      await api.report.updateReport({
        data: valueRef.current.value,
        _id: selectedReportId,
      }),
    [selectedReportId]
  );

  const handeSubmit = useCallback(async (): Promise<void> => {
    selectedReportId ? await updateReport() : await addNewReport();
    handleClose();
  }, [addNewReport, handleClose, selectedReportId, updateReport]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handeSubmit,
      }}
    >
      <DialogTitle>
        {selectedReportId ? "עדכן דיווח" : "צור דיווח חדש"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name="reportData"
          label="דיווח"
          fullWidth
          variant="standard"
          inputRef={valueRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>בטל</Button>
        <Button type="submit">שמור</Button>
      </DialogActions>
    </Dialog>
  );
};
