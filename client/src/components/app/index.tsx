import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../navbar";
import { AllReporsPage } from "../allReports";
import { UserPage } from "../userPage/userPage";
import { useGetAllReports } from "../../hooks/report";
import { AddReportDialog } from "../addReportDialog";
import { LoginPage } from "../Login/LoginScreen";
import { SignUpPage } from "../Login/RegisterScreen";

export const App: FC = () => {
  useGetAllReports();

  return (
    <>
      <BrowserRouter>
        <AddReportDialog />
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<AllReporsPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
