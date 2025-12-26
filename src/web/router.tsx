import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "./home";
import { DownloadThanks } from "./download-thanks";
import "../App.css";

export const WebRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/download-thanks" element={<DownloadThanks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
