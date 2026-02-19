import React from "react";
import { createRoot } from "react-dom/client";

import { Theme } from "@store/app";
import App from "@app/index";

const serviceWorkerInit = () => {
  if (
    process.env.NODE_ENV === "development" ||
    !("serviceWorker" in navigator)
  ) {
    return;
  }
  navigator.serviceWorker.register("/service-worker.js"); // from build root folder
  navigator.serviceWorker.ready.then(() => {
    console.log("Service Worker is ready!");
  });
};

const setTheme = () => {
  const theme = (window.localStorage.getItem("app-theme") as Theme) || "light";
  document.documentElement.setAttribute("data-theme", theme);
};

setTheme();
serviceWorkerInit();
createRoot(document.getElementById("my-portfolio-app")).render(<App />);
