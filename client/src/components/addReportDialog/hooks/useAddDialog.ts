import { useCallback, useMemo } from "react";
import { api } from "../../../api";
import { useAppSelector } from "../../../hooks/store";
import { IReport } from "../../../models";
import { selectReportDialogSelectedId } from "../../../store/addReport";
import { selectUserId } from "../../../store/user";

interface IUseAddDialog {
  getReportData: () => Promise<string>;
  handeSave: (data: string) => Promise<void>;
  titleText: string;
  submitText: string;
}

export const useAddDialog = (): IUseAddDialog => {
  const selectedReportId: string | undefined = useAppSelector(
    selectReportDialogSelectedId
  );
  const userId: string = useAppSelector(selectUserId);

  const getReportData = useCallback(async (): Promise<string> => {
    if (selectedReportId) {
      const currReport: IReport = await api.report.getById(selectedReportId);
      return currReport.data;
    } else return "";
  }, [selectedReportId]);

  const addNewReport = useCallback(
    async (data: string): Promise<void> =>
      await api.report.addReport({
        data,
        ownerId: userId,
      }),
    [userId]
  );

  const updateReport = useCallback(
    async (data: string): Promise<void> =>
      await api.report.updateReport({
        data,
        _id: selectedReportId,
      }),
    [selectedReportId]
  );

  const handeSave = useCallback(
    async (data: string): Promise<void> => {
      await (selectedReportId ? updateReport(data) : addNewReport(data));
    },
    [addNewReport, selectedReportId, updateReport]
  );

  const titleText = useMemo(
    () => (selectedReportId ? "עדכן דיווח" : "צור דיווח חדש"),
    [selectedReportId]
  );

  const submitText = useMemo(
    () => (selectedReportId ? "עדכן" : "שמור"),
    [selectedReportId]
  );

  return {
    handeSave,
    getReportData,
    titleText,
    submitText,
  };
};
