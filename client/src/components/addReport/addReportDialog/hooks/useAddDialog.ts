import {api} from "@/api";
import {useAppSelector} from "@/hooks/store";
import {IReport, IReportDTO} from "@/models";
import {selectReportDialogSelectedId} from "@/store/addReport";
import {selectUserId} from "@/store/user";
import {AddReportFormData, defaultFormValues, EAddReportFields,} from "@@/addReport/formUtils";
import {useCallback, useMemo, useState} from "react";
import {toast} from "react-toastify";

type TGetReportForFormRes = Promise<AddReportFormData>;
interface IUseAddDialog {
  getReportForForm: () => TGetReportForFormRes;
  handeSave: (
    data: string,
    image: any,
    imageFileName?: string
  ) => Promise<boolean>;
  handleWrongFormData: () => void;
  titleText: string;
  submitText: string;
  isButtonLoading: boolean;
}

export const useAddDialog = (): IUseAddDialog => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
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
    ): Promise<boolean> => {
      setIsButtonLoading(true);
      const dto: IReportDTO = {
        data,
      };
      try {
        if (imageFile) {
          const image = new FormData();
          image.append("image", imageFile);

          const imageName = await api.image.uploadImage(image, imageFileName);
          dto.imageName = imageName;
        }

        if (selectedReportId) {
          await api.report.updateReport({ ...dto, _id: selectedReportId });
          toast.success("הדיווח עודכן בהצלחה");
        } else {
          await api.report.addReport({ ...dto, ownerId: userId });
          toast.success("הדיווח נוצר בהצלחה");
        }

        setIsButtonLoading(false);
        return true;
      } catch (error) {
        toast.error(
          `אירעה שגיאה ${selectedReportId ? "בעדכון" : "ביצירת"} הדיווח `
        );
        setIsButtonLoading(false);
        return false;
      }
    },
    [selectedReportId, userId]
  );

  const handleWrongFormData = (): void => {
    toast.error("נא למלא פרטים תקינים");
  };

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
    handleWrongFormData,
    getReportForForm,
    titleText,
    submitText,
    isButtonLoading,
  };
};
