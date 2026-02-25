import React, { lazy } from 'react';

import { Routes, Route } from 'react-router';

import Profile from '@app/routes/profile';
import Components from '@app/routes/components';
import Widgets from '@app/routes/widgets';
import Games from '@app/routes/games';
import Apps from '@app/routes/apps';

const Page404 = lazy(() => import('@pages/404'));

const renderRoutes = (routes: React.ReactNode[]) => {
  return routes.map((route) => route);
};

const AppRoutes = () => (
  <Routes>
    {renderRoutes(Profile)}
    {renderRoutes(Apps)}
    {renderRoutes(Games)}
    {renderRoutes(Widgets)}
    {renderRoutes(Components)}
    <Route
      path="*"
      element={<Page404 />}
    />
  </Routes>
);

export default AppRoutes;
