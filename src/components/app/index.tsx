import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '@components/routes';
import AppHeader from '@components/header';
import SideBar from '@components/aside';

import STORE from '@store/index';

import './style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={STORE}>
        <SideBar />
        <div className="content">
          <AppHeader />
          <AppRoutes />
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
