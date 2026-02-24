import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import Loader from '@app/layout/loader';
import ErrorBoundary from '@shared/components/error-boundary';

const Profile = lazy(() => import('@pages/profile'));

export default [
  <Route
    path="/"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Profile />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/profile"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Profile />
        </ErrorBoundary>
      </Suspense>
    }
  />,
];
