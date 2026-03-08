import { Suspense, lazy } from 'react';
import { Route } from 'react-router';

import Loader from '@app/layout/loader';
import ErrorBoundary from '@shared/components/error-boundary';

const Apps = lazy(() => import('@pages/apps'));
const WineCollection = lazy(() => import('@pages/apps/wine-collection'));
const SpotifyApp = lazy(() => import('@pages/apps/spotify-app'));

export default [
  <Route path="/apps" element={<Apps />} />,
  <Route
    path="/apps/wine-collection/*"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <WineCollection />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/apps/spotify-app"
    element={
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <SpotifyApp />
        </ErrorBoundary>
      </Suspense>
    }
  />,
];
