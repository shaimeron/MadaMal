import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AllReporsPage } from "../allReports";
import { UserPage } from "../userPage";
import { useGetAllReports } from "../../hooks/report";
import { AddReportDialog } from "../addReportDialog";
import { Chat } from "../Chat";
import { ReportsWithUpdatePage } from "../reportsWithUpdatePage";
import { StaticDisplay } from "../mainDisplay";

export const App: FC = () => {
  useGetAllReports();

  return (
    <>
      <AddReportDialog />
      <Routes>
        <Route path="/" element={<StaticDisplay />}>
          <Route index element={<AllReporsPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/report/:reportId" element={<ReportsWithUpdatePage />} />
        </Route>
      </Routes>
    </>
  );
};
