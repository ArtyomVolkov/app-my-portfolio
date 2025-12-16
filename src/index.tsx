import React from "react";

import { createRoot } from "react-dom/client";

import App from "@components/app";

const serviceWorkerInit = () => {
  if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
    return;
  }
  navigator.serviceWorker.register("/service-worker.js"); // from build root folder
  navigator.serviceWorker.ready.then(() => {
    console.log("Service Worker is ready!");
  });
};

serviceWorkerInit();
createRoot(document.getElementById("my-portfolio-app")).render(<App />);
