import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import AppContent from '@components/app/app-content';

import THEME from '@assets/theme/main';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={THEME}>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
