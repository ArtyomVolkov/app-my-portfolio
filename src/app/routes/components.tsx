import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import Loader from '@app/layout/loader';
import ErrorBoundary from '@shared/components/error-boundary';

const Components = lazy(() => import('@pages/components'));
const Shapes = lazy(() => import('@pages/components/shapes'));
const UiKit = lazy(() => import('@pages/components/ui-kit'));

export default [
  <Route path="/components" element={<Components />} />,
  <Route
    path="/components/shapes"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Shapes />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/components/ui-kit"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <UiKit />
        </ErrorBoundary>
      </Suspense>
    }
  />,
];
