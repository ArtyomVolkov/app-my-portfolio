import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import AppContent from '@components/app/app-content';

import STORE from '@store/index';
import THEME from '@assets/theme/main';

import './style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={STORE}>
        <ThemeProvider theme={THEME}>
          <AppContent />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
