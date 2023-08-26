import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { GlobalProvider } from "./contexts/GlobalState";
import { router } from "./router";
import "../index.scss";
import Context from "./contexts/Context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
    <React.StrictMode>
      <GlobalProvider>
        <Context>
        <RouterProvider router={router} />
        </Context>
      </GlobalProvider>
    </React.StrictMode>
  </SkeletonTheme>
);
