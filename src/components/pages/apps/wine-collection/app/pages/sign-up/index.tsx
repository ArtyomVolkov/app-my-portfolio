import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { useNavigate, useLocation } from "react-router-dom";

import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import AppLogo from '@pages/apps/wine-collection/app/components/app-logo';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import { useStore } from '../../store';
import { checkEmail } from '../../apis/email-validator';

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
  const [emailValidation, setEmailValidation] = useState({
    loading: false,
    isValid: true,
  });

  const onCheckEmail = async (value) => {
    if (!value || !value.trim().length) {
      setEmailValidation({
        ...emailValidation,
        loading: false
      });
      return;
    }

    setEmailValidation({
      ...emailValidation,
      loading: true
    });
    const isValid = await checkEmail(value.trim());
    setEmailValidation({
      isValid,
      loading: false
    });
  };

  const onCheckEmailDebounce = useCallback(
    debounce(onCheckEmail, 500, { leading: false, trailing: true }),
    [debounce]
  );

  const onChangeFormField = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'email') {
      setEmailValidation({
        ...emailValidation,
        loading: true,
      });
      onCheckEmailDebounce(value);
    }
  };

  const onSignUp = async () => {
    setLoading(true)
    setError('');
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

  const isDisableToSubmit = () => {
    return emailValidation.loading || !!error || !emailValidation.isValid
      || !formData.password || !formData.email?.trim()?.length
  };

  const renderEmailAdornment = () => {
    const email = formData.email?.trim() || '';

    if (emailValidation.loading) {
      return <CircularProgress className={styles.loadingIcon} size={20} />;
    }
    if (email.length > 0 && emailValidation.isValid) {
      return <CheckCircleOutlineRoundedIcon className={styles.checkIcon} />;
    }
    if (!emailValidation.isValid && email.length > 0) {
      return <CancelRoundedIcon className={styles.errorIcon} />
    }
    return null
  };

  return (
    <div className={styles.wineAppSignUpPage}>
      <form className={mergeClassNames([styles.signUpForm, loading && styles.loading])}>
        <AppLogo />
        <TextField
          placeholder="email"
          type="email"
          variant="outlined"
          className={styles.emailField}
          label="Email"
          size="small"
          slotProps={{
            input: {
              endAdornment: renderEmailAdornment()
            }
          }}
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
          disabled={isDisableToSubmit()}
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