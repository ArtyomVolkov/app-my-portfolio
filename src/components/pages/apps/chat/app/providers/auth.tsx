import React, { useEffect } from 'react';

import AppLoader from '../components/app-loader';
import SignInSignUp from '../components/signin-signup';

import { useStore } from '@pages/apps/chat/app/store';

const AuthProvider = ({ children }) => {
  const { actions, loading, user } = useStore((store) => store);

  useEffect(() => {
    const unsubscribe = actions.subscribeAuthStateChanged();

    return () => {
      unsubscribe();
    }
  }, []);

  if (loading) {
    return <AppLoader />;
  }
  if (!user) {
    return (
      <SignInSignUp />
    );
  }
  return children;
};

export default AuthProvider;