import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "app/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { rootStore, StoreProvider } from "app/providers/StoreProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StoreProvider value={rootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
);

reportWebVitals();
