import React from 'react';

import { HashRouter } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import AppContent from '@components/app/app-content';

import THEME from '@assets/theme/main';

const App = () => {
  return (
    <HashRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={THEME}>
          <AppContent />
        </ThemeProvider>
      </StyledEngineProvider>
    </HashRouter>
  );
};

export default App;
