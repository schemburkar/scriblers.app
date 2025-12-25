import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ScriblersLanding from "./Web";

// const isWeb = import.meta.env.VITE_IS_WEB === "true";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {__IS_WEB__ ? <ScriblersLanding /> : <App />}
  </React.StrictMode>,
);
