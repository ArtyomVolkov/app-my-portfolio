import React from "react";

import { HashRouter } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import AppContent from "@components/app/app-content";

import { useAppStore } from "@store/app";

import THEME from "@assets/theme/main";

const App = () => {
  const theme = useAppStore((state) => state.theme);
  const scheme = THEME[theme?.includes("dark") ? "dark" : "light"];

  return (
    <HashRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={scheme}>
          <AppContent />
        </ThemeProvider>
      </StyledEngineProvider>
    </HashRouter>
  );
};

export default App;
