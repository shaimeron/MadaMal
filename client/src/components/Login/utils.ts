import { LoginDecodedData, api } from "../../api/api";

export const MIN_PASSWORD_LENGTH = 3;
export const ACCESSS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

interface FormValues {
  fullname: string;
  email: string;
  password: string;
}

export const isValidEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return "";
  }
};

export const validateUserForm = ({ fullname, email, password }: FormValues) => {
  const errors: { [key: string]: string } = {};

  if (!fullname.trim()) {
    errors.fullname = "שם מלא הינו שדה חובה";
  }

  if (!email.trim()) {
    errors.email = "אימייל הינו שדה חובה";
  } else if (!isValidEmail(email.trim())) {
    errors.email = 'אנא הזן כתובת דוא"ל חוקית';
  }

  if (!password.trim() && password.length < MIN_PASSWORD_LENGTH) {
    errors.password = "סיסמה הינה שדה חובה";
  }

  return errors;
};


export const handleLoginHeaders = (data: LoginDecodedData) => {
  const { accessToken, refreshToken } = data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const refreshAccessToken = async () => {
  try {
    const response = await api.auth.refresh();

    console.log('response nowww is', response);

    return response.data.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

export const handleLogout = () => {
  localStorage.removeItem(ACCESSS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);

  api.auth.logout();
}

export const getUserId = () => {
  try {
    const accessToken = localStorage.getItem("accessToken") ?? '';
    const decodedAccessToken = parseJwt(accessToken);

    return decodedAccessToken?._id || '';
  } catch (e) {
    return '';
  }
}

export const isUserLoggedIn = () => !!getUserId();