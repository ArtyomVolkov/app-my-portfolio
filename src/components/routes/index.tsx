import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Page404 = lazy(() => import('@pages/404'));
const Profile = lazy(() => import('@pages/profile'));
const Components = lazy(() => import('@pages/components'));
const Shapes = lazy(() => import('@pages/components/shapes'));
const Widgets = lazy(() => import('@pages/widgets'));
const History = lazy(() => import('@pages/widgets/history'));
const Gallery = lazy(() => import('@pages/widgets/gallery'));
const MediaPlayer = lazy(() => import('@pages/widgets/media-player'));
const Games = lazy(() => import('@pages/games'));
const Puzzle = lazy(() => import('@pages/games/puzzle'));
const Sudoku = lazy(() => import('@pages/games/sudoku'));
const Katana = lazy(() => import('@pages/games/nonogram'));

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
      path="/widgets/history"
      element={(
        <Suspense fallback="loading...">
          <History />
        </Suspense>
      )}
    />
    <Route
      path="/widgets/gallery"
      element={(
        <Suspense fallback="loading...">
          <Gallery />
        </Suspense>
      )}
    />
    <Route
      path="/widgets/media-player"
      element={(
        <Suspense fallback="loading...">
          <MediaPlayer />
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
      path="/games/puzzle"
      element={(
        <Suspense fallback="loading...">
          <Puzzle />
        </Suspense>
      )}
    />
    <Route
      path="/games/sudoku"
      element={(
        <Suspense fallback="loading...">
          <Sudoku />
        </Suspense>
      )}
    />
    <Route
      path="/games/nonogram"
      element={(
        <Suspense fallback="loading...">
          <Katana />
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
