import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ErrorBoundary from "@components/error-boundary";

const Page404 = lazy(() => import("@pages/404"));
const Profile = lazy(() => import("@pages/profile"));
const Components = lazy(() => import("@pages/components"));
const Shapes = lazy(() => import("@pages/components/shapes"));
const UiKit = lazy(() => import("@pages/components/ui-kit"));

const Widgets = lazy(() => import("@pages/widgets"));
const History = lazy(() => import("@pages/widgets/history"));
const Gallery = lazy(() => import("@pages/widgets/gallery"));
const Matrix = lazy(() => import("@pages/widgets/matrix"));
const Clock = lazy(() => import("@pages/widgets/clock"));
const Memory = lazy(() => import("@pages/widgets/memory"));

const Games = lazy(() => import("@pages/games"));
const Puzzle = lazy(() => import("@pages/games/puzzle"));
const Sudoku = lazy(() => import("@pages/games/sudoku"));
const Game2048 = lazy(() => import("@pages/games/2048"));
const Katana = lazy(() => import("@pages/games/nonogram"));

const Apps = lazy(() => import("@pages/apps"));
const WineCollection = lazy(() => import("@pages/apps/wine-collection"));
const SpotifyApp = lazy(() => import("@pages/apps/spotify-app"));

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/apps"
      element={
        <Suspense fallback="">
          <Apps />
        </Suspense>
      }
    />
    <Route
      path="/apps/wine-collection/*" // for nested routes
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <WineCollection />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/apps/spotify-app/*" // for nested routes
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <SpotifyApp />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/profile"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/components"
      element={
        <Suspense fallback="">
           <Components />
        </Suspense>
      }
    />
    <Route
      path="/components/shapes"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Shapes />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/components/ui-kit"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <UiKit />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/widgets"
      element={
        <Suspense fallback="">
           <Widgets />
        </Suspense>
      }
    />
    <Route
      path="/widgets/history"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <History />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/widgets/gallery"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Gallery />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/widgets/matrix"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Matrix />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/widgets/clock"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Clock />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/widgets/memory"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Memory />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/games"
      element={
        <Suspense fallback="">
          <Games />
        </Suspense>
      }
    />
    <Route
      path="/games/puzzle"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Puzzle />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/games/2048"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Game2048 />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/games/sudoku"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Sudoku />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="/games/nonogram"
      element={
        <Suspense fallback="">
          <ErrorBoundary>
            <Katana />
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path="*"
      element={
        <Suspense fallback="">
          <Page404 />
        </Suspense>
      }
    />
  </Routes>
);

export default AppRoutes;
