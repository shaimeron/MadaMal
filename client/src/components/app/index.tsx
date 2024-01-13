import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../navbar";
import { AllReporsPage } from "../allReports";
import { UserPage } from "../userPage/userPage";
import { useGetAllReports } from "../../hooks/report";
import { AddReportDialog } from "../addReportDialog";

export const App: FC = () => {
  useGetAllReports();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<AllReporsPage />} />
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <AddReportDialog />
    </>
  );
};
