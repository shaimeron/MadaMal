import { api } from "@/api";
import { useAppSelector } from "@/hooks/store";
import { IReport, IReportDTO } from "@/models";
import { selectReportDialogSelectedId } from "@/store/addReport";
import { selectUserId } from "@/store/user";
import { useCallback, useMemo } from "react";

interface IUseAddDialog {
  getReport: () => Promise<IReport | null>;
  handeSave: (
    data: string,
    image: any,
    imageFileName?: string
  ) => Promise<void>;
  titleText: string;
  submitText: string;
}

export const useAddDialog = (): IUseAddDialog => {
  const selectedReportId: string | undefined = useAppSelector(
    selectReportDialogSelectedId
  );
  const userId: string = useAppSelector(selectUserId);

  const getReport = useCallback(
    async (): Promise<IReport | null> =>
      selectedReportId ? await api.report.getById(selectedReportId) : null,

    [selectedReportId]
  );

  const handeSave = useCallback(
    async (
      data: string,
      imageFile?: File,
      imageFileName?: string
    ): Promise<void> => {
      const dto: IReportDTO = {
        data,
      };

      if (imageFile) {
        const image = new FormData();
        image.append("image", imageFile);

        const imageName = await api.image.uploadImage(image, imageFileName);
        dto.imageName = imageName;
      }

      await (selectedReportId
        ? api.report.updateReport({ ...dto, _id: selectedReportId })
        : api.report.addReport({ ...dto, ownerId: userId }));
    },
    [selectedReportId, userId]
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
    getReport,
    titleText,
    submitText,
  };
};
