import { api } from "@/api";
import { LoginDecodedData } from "@/api/api";
import { parseJwt, handleLoginHeaders } from "@/utils/login";
import { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../../loginFormBody/formUtils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { upadteUser } from "@/store/user";

interface IUseHandleLogin {
  handleValidFormData: (formData: LoginFormData) => Promise<void>;
  handleGoogleLoginFailure: () => void;
  handleGoogleLoginSuccess: (
    credentialResponse: CredentialResponse
  ) => Promise<void>;
}

export const useHandleLogin = (): IUseHandleLogin => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLoginSucsses = async (data: LoginDecodedData) => {
    const { accessToken } = data;

    const decodedAccessToken = parseJwt(accessToken);

    const userId = decodedAccessToken?._id;

    if (!userId) {
      toast.error("שגיאה בפרטי ההתחברות נא לנסות שוב");
      return;
    }

    try {
      handleLoginHeaders(data);
      toast.success("התחברת בהצלחה!");
      dispatch(upadteUser({ userId }));
      navigate("/");
    } catch (error: any) {
      toast.error("שגיאה בפרטי ההתחברות נא לנסות שוב");
    }
  };

  const handleValidFormData = async (formData: LoginFormData) => {
    const { email, password } = formData;
    try {
      const response = await api.auth.login({ email, password });
      onLoginSucsses(response.data);
    } catch (error: any) {
      toast.error(
        error.response.status === 401
          ? "פרטי ההתחברות שהזנת שגויים"
          : "אירעה שגיאה בעת התחברות"
      );
    }
  };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const response = await api.auth.googleLogin(credentialResponse);
      onLoginSucsses(response.data);
    } catch (error: any) {
      handleGoogleLoginFailure();
    }
  };

  const handleGoogleLoginFailure = () => {
    toast.error("אירעה שגיאה בעת התחברות עם גוגל יש לנסות שוב");
  };

  return {
    handleGoogleLoginFailure,
    handleGoogleLoginSuccess,
    handleValidFormData,
  };
};
