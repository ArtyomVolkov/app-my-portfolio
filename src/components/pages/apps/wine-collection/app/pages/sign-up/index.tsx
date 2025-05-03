import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import AppLogo from '@pages/apps/wine-collection/app/components/app-logo';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import { useStore } from '../../store';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const WineAppSignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { actions } = useStore((store) => store);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const onChangeFormField = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSignUp = async () => {
    setLoading(true)
    const error = await actions.onSignUp(formData.email, formData.password);
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }
    toLoginPage();
  };

  const toLoginPage = () => {
    navigate(location.pathname.replace('sign-up', 'login'));
  };

  return (
    <div className={styles.wineAppSignUpPage}>
      <form className={mergeClassNames([styles.signUpForm, loading && styles.loading])}>
        <AppLogo />
        <TextField
          placeholder="email"
          type="email"
          variant="outlined"
          label="Email"
          size="small"
          onChange={(e) => onChangeFormField('email', e.target.value)}
        />
        <TextField
          placeholder="password"
          type="password"
          variant="outlined"
          label="Password"
          size="small"
          inputProps={{
            autoComplete: 'new-password'
          }}
          onChange={(e) => onChangeFormField('password', e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<PersonAddAltOutlinedIcon />}
          onClick={onSignUp}
          disabled={!!error || !formData.email || !formData.password}
        >
          Sign Up
        </Button>
        {
          error && (
            <Alert severity="error">{error}</Alert>
          )
        }
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

export default WineAppSignUpPage;