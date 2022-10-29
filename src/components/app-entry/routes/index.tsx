import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Page404 = lazy(() => import('@pages/404'));
const Dashboard = lazy(() => import('@pages/dashboard'));
const Account = lazy(() => import('@pages/account'));
const Analytics = lazy(() => import('@pages/analytics'));

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={(
        <Suspense fallback="loading...">
          <Dashboard />
        </Suspense>
      )}
    />
    <Route
      path="/dashboard"
      element={(
        <Suspense fallback="loading...">
          <Dashboard />
        </Suspense>
      )}
    />
    <Route
      path="/account"
      element={(
        <Suspense fallback="loading...">
          <Account />
        </Suspense>
      )}
    />
    <Route
      path="/analytics"
      element={(
        <Suspense fallback="loading...">
          <Analytics />
        </Suspense>
      )}
    />
    <Route
      path="*"
      element={(
        <Suspense fallback="loading...">
          <Page404 />
        </Suspense>
      )}
    />
  </Routes>
);

export default AppRoutes;
