import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';

const Apps = lazy(() => import('@pages/apps'));
const WineCollection = lazy(() => import('@pages/apps/wine-collection'));
const SpotifyApp = lazy(() => import('@pages/apps/spotify-app'));

import ErrorBoundary from '@shared/components/error-boundary';

export default [
  <Route
    path="/apps"
    element={
      <Suspense fallback="">
        <Apps />
      </Suspense>
    }
  />,
  <Route
    path="/apps/wine-collection/*"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <WineCollection />
        </ErrorBoundary>
      </Suspense>
    }
  />,
  <Route
    path="/apps/spotify-app/*"
    element={
      <Suspense fallback="">
        <ErrorBoundary>
          <SpotifyApp />
        </ErrorBoundary>
      </Suspense>
    }
  />,
];
