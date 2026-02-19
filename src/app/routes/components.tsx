import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundary from '@shared/components/error-boundary';

const Components = lazy(() => import('@pages/components'));
const Shapes = lazy(() => import('@pages/components/shapes'));
const UiKit = lazy(() => import('@pages/components/ui-kit'));

export default [
  <Route
    path="/components"
    element={
      <Suspense fallback="">
        <Components />
      </Suspense>
    }
  />,
  <Route
    path="/components/shapes"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <Shapes />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/components/ui-kit"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <UiKit />
        </ErrorBoundary>
      </Suspense>
    }
  />,
];
