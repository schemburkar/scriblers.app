import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WebRouter } from "./web/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>{__IS_WEB__ ? <WebRouter /> : <App />}</React.StrictMode>,
);
