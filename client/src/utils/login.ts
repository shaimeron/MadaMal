import { LoginDecodedData, api } from "@/api/api";

export const ACCESSS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
export const googleApi = {
  clientId:
    "544789251553-0qii4frjud6uu674obslmdp6n9uaou08.apps.googleusercontent.com",
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return "";
  }
};

export const handleLoginHeaders = (data: LoginDecodedData) => {
  const { accessToken, refreshToken } = data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const refreshAccessToken = async () => {
  try {
    const response = await api.auth.refresh();

    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

export const handleLogout = () => {
  localStorage.removeItem(ACCESSS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);

  api.auth.logout();
};

export const getUserIdFromLocalStorage = () => {
  try {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    const decodedAccessToken = parseJwt(accessToken);

    return decodedAccessToken?._id || "";
  } catch (e) {
    return "";
  }
};
