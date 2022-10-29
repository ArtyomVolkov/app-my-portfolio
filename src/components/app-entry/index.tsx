import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '@components/app-entry/routes';
import AppHeader from '@components/app-entry/header';

import STORE from '@store/index';

import './style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={STORE}>
        <AppHeader />
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
