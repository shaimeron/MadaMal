import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../navbar";
import { AllReporsPage } from "../allReports";
import { UserPage } from "../userPage";
import { useGetAllReports } from "../../hooks/report";
import { AddReportDialog } from "../addReportDialog";
import { LoginPage } from "../Login/LoginScreen";
import { SignUpPage } from "../Login/RegisterScreen";
import { Chat } from "../Chat";

export const App: FC = () => {
  useGetAllReports();

  return (
    <>
      <AddReportDialog />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<AllReporsPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
};
