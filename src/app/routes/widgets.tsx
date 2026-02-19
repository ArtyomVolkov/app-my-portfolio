import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';

const Widgets = lazy(() => import('@pages/widgets'));
const History = lazy(() => import('@pages/widgets/history'));
const Gallery = lazy(() => import('@pages/widgets/gallery'));
const Matrix = lazy(() => import('@pages/widgets/matrix'));
const Clock = lazy(() => import('@pages/widgets/clock'));
const Memory = lazy(() => import('@pages/widgets/memory'));

import ErrorBoundary from '@shared/components/error-boundary';

export default [
  <Route
    path="/widgets"
    element={
      <Suspense fallback="">
        <Widgets />
      </Suspense>
    }
  />,
  <Route
    path="/widgets/history"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <History />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/widgets/gallery"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <Gallery />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/widgets/matrix"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <Matrix />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/widgets/clock"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <Clock />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/widgets/memory"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <Memory />
        </ErrorBoundary>
      </Suspense>
    }
  />,
];
