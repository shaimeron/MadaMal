import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AllReporsPage } from "../allReports";
import { UserPage } from "../userPage";
import { useGetAllReports } from "../../hooks/report";
import { LoginPage } from "../Login/LoginScreen";
import { SignUpPage } from "../Login/RegisterScreen";
import { Chat } from "../Chat";
import { ReportsWithUpdatePage } from "../reportsWithUpdatePage";
import { gapi } from "gapi-script";
import { googleApi } from "../Login/utils";
import { StaticDisplay } from "../mainDisplay";

export const App: FC = () => {
  useGetAllReports();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleApi.clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

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
