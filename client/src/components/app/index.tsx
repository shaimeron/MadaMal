import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../navbar";
import { AllReporsPage } from "../allReports";
import { UserPage } from "../userPage";
import { useGetAllReports } from "../../hooks/report";
import { AddReportDialog } from "../addReportDialog";
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
        </Route>
      </Routes>
    </>
  );
};
