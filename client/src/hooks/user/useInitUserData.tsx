import { api } from "@/api";
import { selectUserId, upadteUser } from "@/store/user";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import { getUserIdFromLocalStorage, googleApi } from "@/utils/login";

const initGoogle = (): void =>
  gapi.client.init({
    clientId: googleApi.clientId,
    scope: "",
  });

export const useGetUserData = (): void => {
  const dispatch = useDispatch();
  const storeUserId = useAppSelector(selectUserId);

  const handleFetchUserDetails = async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (!!localStorageUserId && !storeUserId) {
      const { _id, email, fullname, imageUrl } = await api.user.getById(
        localStorageUserId
      );
      dispatch(
        upadteUser({
          userId: _id,
          email,
          fullname,
          imageUrl,
        })
      );
    }
  };

  useEffect(() => {
    gapi.load("client:auth2", initGoogle);
    handleFetchUserDetails();
  }, []);
};
