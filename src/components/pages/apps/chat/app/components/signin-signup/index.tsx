import React from 'react';

import AnimationView from '@shared/components/layout/view';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

import Tabs from '../tabs';
import SignIn from './signin';
import SignUp from './signup';
import VerifyEmail from './verify';

import { useAuthStore } from '../../store/auth';

import styles from './style.module.scss';

const SignInSignUp = () => {
  const user = useAuthStore((store) => store.user);
  const tabs = [
    {
      key: 'sign-in',
      label: 'Sign In',
      icon: <LoginRoundedIcon />,
      component: <SignIn />,
    },
    {
      key: 'sign-up',
      label: 'Sign Up',
      icon: <PersonAddRoundedIcon />,
      component: <SignUp />,
    }
  ];

  const renderContent = () => {
    if (!user) {
      return <Tabs tabs={tabs} />;
    }
    if (!user.emailVerified) {
      return <VerifyEmail />;
    }
  };

  return (
    <section className={styles.signInWidget}>
      <AnimationView>
        {renderContent()}
      </AnimationView>
    </section>
  );
};

export default SignInSignUp;