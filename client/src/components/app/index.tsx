import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useGetAllReports } from "../../hooks/report";
import { Chat } from "../Chat";
import { LoginPage } from "../LoginScreen/loginPage";
import { SignUpPage } from "../RegisterScreen";
import { AllReporsPage } from "../allReports";
import { StaticDisplay } from "../mainDisplay";
import { ReportsWithUpdatePage } from "../reportsWithUpdatePage";
import { UserPage } from "../userPage";
import { useGetUserData } from "@/hooks/user";

export const App: FC = () => {
  useGetAllReports();
  useGetUserData();

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
