import React from 'react';

import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import AppContent from '@components/app/app-content';

import THEME from '@assets/theme/main';

const App = () => {
  return (
    <HashRouter>
      <ThemeProvider theme={THEME}>
        <AppContent />
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
