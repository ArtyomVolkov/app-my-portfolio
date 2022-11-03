import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Page404 = lazy(() => import('@pages/404'));
const Profile = lazy(() => import('@pages/profile'));
const Components = lazy(() => import('@pages/components'));
const Shapes = lazy(() => import('@pages/components/shapes'));
const Widgets = lazy(() => import('@pages/widgets'));
const Games = lazy(() => import('@pages/games'));

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={(
        <Suspense fallback="loading...">
          <Profile />
        </Suspense>
      )}
    />
    <Route
      path="/profile"
      element={(
        <Suspense fallback="loading...">
          <Profile />
        </Suspense>
      )}
    />
    <Route
      path="/components"
      element={(
        <Suspense fallback="loading...">
          <Components />
        </Suspense>
      )}
    />
    <Route
      path="/components/shapes"
      element={(
        <Suspense fallback="loading...">
          <Shapes />
        </Suspense>
      )}
    />
    <Route
      path="/widgets"
      element={(
        <Suspense fallback="loading...">
          <Widgets />
        </Suspense>
      )}
    />
    <Route
      path="/games"
      element={(
        <Suspense fallback="loading...">
          <Games />
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
