import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Page404 = lazy(() => import('@pages/404'));
const Profile = lazy(() => import('@pages/profile'));
const Components = lazy(() => import('@pages/components'));
const Shapes = lazy(() => import('@pages/components/shapes'));

const Widgets = lazy(() => import('@pages/widgets'));
const History = lazy(() => import('@pages/widgets/history'));
const Gallery = lazy(() => import('@pages/widgets/gallery'));
const Weather = lazy(() => import('@pages/widgets/weather'));

const Games = lazy(() => import('@pages/games'));
const Puzzle = lazy(() => import('@pages/games/puzzle'));
const Sudoku = lazy(() => import('@pages/games/sudoku'));
const Katana = lazy(() => import('@pages/games/nonogram'));

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={(
        <Suspense fallback="">
          <Profile />
        </Suspense>
      )}
    />
    <Route
      path="/profile"
      element={(
        <Suspense fallback="">
          <Profile />
        </Suspense>
      )}
    />
    <Route
      path="/components"
      element={(
        <Suspense fallback="">
          <Components />
        </Suspense>
      )}
    />
    <Route
      path="/components/shapes"
      element={(
        <Suspense fallback="">
          <Shapes />
        </Suspense>
      )}
    />
    <Route
      path="/widgets"
      element={(
        <Suspense fallback="">
          <Widgets />
        </Suspense>
      )}
    />
    <Route
      path="/widgets/history"
      element={(
        <Suspense fallback="">
          <History />
        </Suspense>
      )}
    />
    <Route
      path="/widgets/gallery"
      element={(
        <Suspense fallback="">
          <Gallery />
        </Suspense>
      )}
    />
    <Route
      path="/widgets/weather"
      element={(
        <Suspense fallback="">
          <Weather />
        </Suspense>
      )}
    />
    <Route
      path="/games"
      element={(
        <Suspense fallback="">
          <Games />
        </Suspense>
      )}
    />
    <Route
      path="/games/puzzle"
      element={(
        <Suspense fallback="">
          <Puzzle />
        </Suspense>
      )}
    />
    <Route
      path="/games/sudoku"
      element={(
        <Suspense fallback="">
          <Sudoku />
        </Suspense>
      )}
    />
    <Route
      path="/games/nonogram"
      element={(
        <Suspense fallback="">
          <Katana />
        </Suspense>
      )}
    />
    <Route
      path="*"
      element={(
        <Suspense fallback="">
          <Page404 />
        </Suspense>
      )}
    />
  </Routes>
);

export default AppRoutes;
