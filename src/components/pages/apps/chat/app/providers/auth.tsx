import React, { useEffect } from 'react';

import AppLoader from '../components/app-loader';
import SignInSignUp from '../components/signin-signup';

import { useAuthStore } from '@pages/apps/chat/app/store/auth';

const AuthProvider = ({ children }) => {
  const { actions, loading, user } = useAuthStore((store) => store);

  useEffect(() => {
    const unsubscribe = actions.subscribeAuthStateChanged();

    return () => {
      unsubscribe();
    }
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  if (!user || !user.emailVerified) {
    return (
      <SignInSignUp />
    );
  }
  return children;
};

export default AuthProvider;