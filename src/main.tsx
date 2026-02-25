import { createRoot } from "react-dom/client";

import { type Theme } from "@store/app";
import App from "@app/index";

const setTheme = () => {
  const theme = (window.localStorage.getItem("app-theme") as Theme) || "light";
  document.documentElement.setAttribute("data-theme", theme);
};

setTheme();
createRoot(document.getElementById("portfolio-app")!).render(<App />);
