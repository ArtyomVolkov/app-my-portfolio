import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import Loader from '@app/layout/loader';
const Games = lazy(() => import('@pages/games'));
const Puzzle = lazy(() => import('@pages/games/puzzle'));
const Sudoku = lazy(() => import('@pages/games/sudoku'));
const Game2048 = lazy(() => import('@pages/games/2048'));
const Katana = lazy(() => import('@pages/games/nonogram'));

import ErrorBoundary from '@shared/components/error-boundary';

export default [
  <Route path="/games" element={<Games />} />,
  <Route
    path="/games/puzzle"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Puzzle />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/games/2048"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Game2048 />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/games/sudoku"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Sudoku />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/games/nonogram"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Katana />
        </ErrorBoundary>
      </Suspense>
    }
  />,
];
