import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../navbar";
import { AllReporsPage } from "../allReports";
import { UserPage } from "../userPage/userPage";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<AllReporsPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
