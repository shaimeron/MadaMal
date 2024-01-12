import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../navbar";
import { MainPage } from "../mainPage";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
