import React, { useRef } from 'react';

import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

import Tabs from '../tabs';
import Login from './login';
import SignUp from './signup';

import styles from './style.module.scss'

const SignInSignUp = () => {
  const sectionRef = useRef(null);
  const tabs = [
    {
      key: 'sign-in',
      label: 'Sign In',
      icon: <LoginRoundedIcon />,
      component: <Login />,
    },
    {
      key: 'sign-up',
      label: 'Sign Up',
      icon: <PersonAddRoundedIcon />,
      component: <SignUp />,
    }
  ];

  return (
    <section className={styles.signInWidget} ref={sectionRef}>
      <Tabs tabs={tabs} />
    </section>
  );
};

export default SignInSignUp;