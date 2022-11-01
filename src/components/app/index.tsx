import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '@components/routes';
import AppHeader from '@components/header';
import SideBar from '@components/aside';

import STORE from '@store/index';
import THEME from '@assets/theme/main';

import './style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={STORE}>
        <ThemeProvider theme={THEME}>
          <SideBar />
          <div className="content">
            <AppHeader />
            <AppRoutes />
          </div>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
