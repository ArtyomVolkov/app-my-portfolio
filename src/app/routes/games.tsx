import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';

const Games = lazy(() => import('@pages/games'));
const Puzzle = lazy(() => import('@pages/games/puzzle'));
const Sudoku = lazy(() => import('@pages/games/sudoku'));
const Game2048 = lazy(() => import('@pages/games/2048'));
const Katana = lazy(() => import('@pages/games/nonogram'));

import ErrorBoundary from '@shared/components/error-boundary';

export default [
  <Route
    path="/games"
    element={
      <Suspense fallback="">
        <Games />
      </Suspense>
    }
  />,
  <Route
    path="/games/puzzle"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <Puzzle />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/games/2048"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <Game2048 />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/games/sudoku"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <Sudoku />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/games/nonogram"
    element={
      <Suspense fallback="loading...">
        <ErrorBoundary>
          <Katana />
        </ErrorBoundary>
      </Suspense>
    }
  />,
];
