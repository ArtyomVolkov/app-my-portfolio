import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import WineList from '@pages/apps/wine-collection/app/pages/wine-list';
import Login from '@pages/apps/wine-collection/app/pages/login';
import Page404 from '@pages/apps/wine-collection/app/pages/404';
import SignUpPage from '@pages/apps/wine-collection/app/pages/sign-up';
import ForgotPassword from '@pages/apps/wine-collection/app/pages/forgot-password';
import WineDetails from '@pages/apps/wine-collection/app/pages/wine-details';

import AppLoader from '@pages/apps/wine-collection/app/components/app-loader';

import { useStore } from '../store';

const AuthRequire = ({ children }) => {
  const user = useStore((store) => store.user);

  if (user) {
    return children;
  }
  return <Navigate to={'login'} replace={true} />;
};

const AppRoutes = () => {
  const { loading, actions } = useStore((store) => store);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (userData) => {
      actions.setUser(userData ? userData.toJSON() : null);
    }, () => {
      actions.setUser(null);
    });
  }, []);

  if (loading) {
    return (
      <AppLoader />
    )
  }

  return (
    <Routes>
      <Route path="/" element={<AuthRequire><WineList /></AuthRequire>} />
      <Route path="/login" index element={<Login />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/wine-list" element={<AuthRequire><WineList /></AuthRequire>} />
      <Route path="/wine-list/:id" element={<AuthRequire><WineDetails /></AuthRequire>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;