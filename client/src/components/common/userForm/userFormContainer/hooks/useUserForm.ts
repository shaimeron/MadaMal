import { api } from "@/api";
import { useAppSelector } from "@/hooks/store";
import { UserRegister, UserUpdateDto } from "@/models";
import { selectUser, upadteUser } from "@/store/user";
import { useCallback, useMemo, useState } from "react";
import { EUserFields, defaultFormValues, UserFormData } from "../../formUtils";
import { toast } from "react-toastify";
import { uploadImage } from "@/utils/files";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IUseUserForm {
  handleValidFormData: (formData: UserFormData) => Promise<void>;
  getUserForForm: () => UserFormData;
  handleWrongFormData: () => void;
  titleText: string;
  submitText: string;
  isUpdateForm: boolean;
  isButtonLoading: boolean;
}

export const useUserForm = (): IUseUserForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const userData = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUpdateForm: boolean = useMemo(
    () => !!userData.userId,
    [userData.userId]
  );

  const getUserForForm = useCallback((): UserFormData => {
    if (!isUpdateForm) return defaultFormValues;

    return {
      [EUserFields.EMAIL]: userData.email,
      [EUserFields.FULL_NAME]: userData.fullname,
      [EUserFields.DEFAULT_IMAGE_NAME]: userData.imageUrl,
      [EUserFields.PASSWORD]: "update",
    };
  }, [isUpdateForm, userData]);

  const finishUpdateLogic = async (fullname: string, imageName?: string) => {
    const userDto: UserUpdateDto = {
      fullname,
    };

    if (imageName) userDto.imageUrl = imageName;

    try {
      await api.user.update(userDto);
      dispatch(upadteUser(userDto));

      toast.success("הפרטים עודכנו בהצלחה");
    } catch (error: any) {
      toast.error("אירעה שגיאה בעדכון הפרטים");
    }
  };

  const finishRegisterLogic = async (
    formData: UserFormData,
    imageName?: string
  ) => {
    const { email, fullname, password } = formData;

    const registerDto: UserRegister = {
      email,
      fullname,
      password,
    };

    if (imageName) registerDto.imageUrl = imageName;

    try {
      const response = await api.auth.register(registerDto);

      if (response.status === 201) {
        toast.success("המשתמש נוצר בהצלחה");
        navigate("/login");
      } else {
        toast.error("אירעה שגיאה ביצירת המשתמש");
      }
    } catch (error: any) {
      if (error.response.status === 406) {
        toast.error("משתמש כבר קיים");
      } else {
        console.error("Error during signup:", error);
        toast.error("אירעה שגיאה ביצירת המשתמש");
      }
    }
  };

  const handleValidFormData = async (formData: UserFormData): Promise<void> => {
    const imageFile = formData[EUserFields.IMAGE];
    setIsButtonLoading(true);
    try {
      let serverFileName = "";
      if (imageFile) {
        serverFileName = await uploadImage(imageFile);
      }

      await (isUpdateForm
        ? finishUpdateLogic(formData[EUserFields.FULL_NAME], serverFileName)
        : finishRegisterLogic(formData, serverFileName));
    } catch (error: any) {
      toast.error("אירעה שגיאה בשמירת התמונה בשרת, אנא נסה שנית");
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleWrongFormData = (): void => {
    toast.error("נא למלא פרטים תקינים");
  };

  const titleText = useMemo(
    () => (isUpdateForm ? "עריכת פרטים" : "הרשמה"),
    [isUpdateForm]
  );

  const submitText = useMemo(
    () => (isUpdateForm ? "עדכן" : "הרשם"),
    [isUpdateForm]
  );

  return {
    handleWrongFormData,
    handleValidFormData,
    getUserForForm,
    titleText,
    submitText,
    isUpdateForm,
    isButtonLoading,
  };
};
