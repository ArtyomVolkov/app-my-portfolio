import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import AppLogo from '@pages/apps/wine-collection/app/components/app-logo';

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import { useStore } from '@pages/apps/wine-collection/app/store';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const ForgotPassword = () => {
  const actions = useStore((store) => store.actions)
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const onChangeEmailField = (value) => {
    setError('');
    setEmail(value)
  };

  const onSendResetPassword = async () => {
    setLoading(true)
    const error = await actions.onResetPassword(email);
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }
    toLoginPage();
  };

  const toLoginPage = () => {
    navigate(location.pathname.replace('forgot-password', 'login'));
  };

  return (
    <div className={styles.wineAppForgotPasswordPage}>
      <form className={mergeClassNames([styles.resetPasswordForm, loading && styles.loading])}>
        <AppLogo />
        <TextField
          placeholder="email"
          type="email"
          variant="outlined"
          label="Email"
          size="small"
          error={!!error}
          helperText={error}
          onChange={(e) => onChangeEmailField(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<MailOutlineOutlinedIcon />}
          onClick={onSendResetPassword}
          disabled={!!error || !email}
        >
          Send
        </Button>
        <Divider />
        <Button
          variant="text"
          onClick={toLoginPage}
        >
          Back to Log In
        </Button>
      </form>
    </div>
  )
};

export default ForgotPassword;