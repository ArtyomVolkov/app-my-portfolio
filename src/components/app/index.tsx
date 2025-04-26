import React, { useEffect } from 'react';

import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import AppContent from '@components/app/app-content';

import THEME from '@assets/theme/main';
import FBService from '@services/firebase';

const App = () => {
  useEffect(() => {
    FBService.initialize();
  }, []);

  return (
    <HashRouter>
      <ThemeProvider theme={THEME}>
        <AppContent />
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
