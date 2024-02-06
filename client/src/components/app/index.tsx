import { api } from "@/api";
import { useAppSelector } from "@/hooks/store";
import { selectUserId, setUser } from "@/store/user";
import { gapi } from "gapi-script";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useGetAllReports } from "../../hooks/report";
import { Chat } from "../Chat";
import { LoginPage } from "../Login/LoginScreen";
import { SignUpPage } from "../Login/RegisterScreen";
import { getUserId, googleApi } from "../Login/utils";
import { AllReporsPage } from "../allReports";
import { StaticDisplay } from "../mainDisplay";
import { ReportsWithUpdatePage } from "../reportsWithUpdatePage";
import { UserPage } from "../userPage";

export const App: FC = () => {
  const dispatch = useDispatch();
  const storeUserId = useAppSelector(selectUserId);

  useGetAllReports();
  const handleFetchUserDetails = async () => {
    const localStorageUserId = getUserId();
    if (!!localStorageUserId && !storeUserId) {
      const { _id, email, fullname, imageUrl } = await api.user.getById(
        localStorageUserId
      );
      dispatch(
        setUser({
          userId: _id,
          email,
          fullname,
          imageUrl,
        })
      );
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleApi.clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  useEffect(() => {
    handleFetchUserDetails();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<StaticDisplay />}>
          <Route index element={<AllReporsPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/report/:reportId" element={<ReportsWithUpdatePage />} />
        </Route>
      </Routes>
    </>
  );
};
