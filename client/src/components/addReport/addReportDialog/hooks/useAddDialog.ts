import { api } from "@/api";
import { useAppSelector } from "@/hooks/store";
import { IReport, IReportDTO } from "@/models";
import { selectReportDialogSelectedId } from "@/store/addReport";
import { selectUserId } from "@/store/user";
import {
  AddReportFormData,
  EAddReportFields,
  defaultFormValues,
} from "@@/addReport/formUtils";
import { useCallback, useMemo } from "react";

type TGetReportForFormRes = Promise<AddReportFormData>;
interface IUseAddDialog {
  getReportForForm: () => TGetReportForFormRes;
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

  const getReportForForm = useCallback(async (): TGetReportForFormRes => {
    if (!selectedReportId) return defaultFormValues;

    const report: IReport = await api.report.getById(selectedReportId);
    if (!report) return defaultFormValues;

    return {
      [EAddReportFields.DATA]: report.data,
      [EAddReportFields.DEFAULT_IMAGE_NAME]: report.imageName,
    };
  }, [selectedReportId]);

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
    getReportForForm,
    titleText,
    submitText,
  };
};
