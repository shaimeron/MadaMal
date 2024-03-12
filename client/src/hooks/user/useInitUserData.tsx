import { api } from "@/api";
import { selectUserId, upadteUser } from "@/store/user";
import { gapi } from "gapi-script";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import { getUserIdFromLocalStorage, googleApi } from "@/utils/login";
import { StoreUser } from "@/models";

const initGoogle = (): void =>
  gapi.client.init({
    clientId: googleApi.clientId,
    scope: "",
  });

export const useGetUserData = (): void => {
  const dispatch = useDispatch();
  const storeUserId = useAppSelector(selectUserId);

  const addUserToStore = useCallback(
    async (userId: string) => {
      const { email, fullname, imageUrl } = await api.user.getById(userId);

      const userToAdd: Partial<StoreUser> = {
        email,
        fullname,
        imageUrl,
      };

      if (!storeUserId) userToAdd.userId = userId;

      dispatch(upadteUser(userToAdd));
    },
    [dispatch, storeUserId]
  );

  const handleFetchUserDetails = async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (localStorageUserId) addUserToStore(localStorageUserId);
  };

  useEffect(() => {
    if (storeUserId) addUserToStore(storeUserId);
  }, [addUserToStore, storeUserId]);

  useEffect(() => {
    gapi.load("client:auth2", initGoogle);
    handleFetchUserDetails();
  }, []);
};
