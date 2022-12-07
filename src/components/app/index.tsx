import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import AppContent from '@components/app/app-content';

import THEME from '@assets/theme/main';

import TempPage from '@components/app/temp';

import './style.scss';

const App = () => {
  return  (
    <TempPage />
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={THEME}>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
