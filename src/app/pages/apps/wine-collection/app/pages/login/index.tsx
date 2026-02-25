import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

import AppLogo from '@pages/apps/wine-collection/app/components/app-logo';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import { useStore } from '@pages/apps/wine-collection/app/store';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const WineAppLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, actions } = useStore((store) => store);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    const path = location.pathname.split('/').slice(0, -1).join('/');
    if (user) {
      navigate(path, {
        replace: true,
      });
    }
  }, [user]);

  const onChangeFormField = (name: 'email' | 'password', value: string) => {
    setError('');
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSignIn = async () => {
    setLoading(true);
    const error = await actions.onSignIn(formData.email!, formData.password!);
    setLoading(false);

    if (error) {
      setError(error);
    }
  };

  const onSignInWithGoogle = async () => {
    setLoading(true);
    const error = await actions.onSignInWithGoogle();
    setLoading(false);

    if (error) {
      setError(error);
    }
  };

  const onForgotPasswordHandle = () => {
    const path = location.pathname.split('/').slice(0, -1).join('/');
    navigate(`${path}/forgot-password`);
  };

  const onSignUpHandle = () => {
    const path = location.pathname.split('/').slice(0, -1).join('/');
    navigate(`${path}/sign-up`);
  };

  return (
    <div className={styles.wineAppLoginPage}>
      <form
        className={mergeClassNames([
          styles.loginForm,
          loading && styles.loading,
        ])}
      >
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
          onChange={(e) => onChangeFormField('password', e.target.value)}
        />
        <Button
          variant="outlined"
          startIcon={<LoginIcon />}
          onClick={onSignIn}
          disabled={!!error || !formData.email || !formData.password}
        >
          Sign In
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        <Divider />
        <Button
          variant="contained"
          startIcon={<PersonAddAltOutlinedIcon />}
          onClick={onSignUpHandle}
        >
          Sign Up
        </Button>
        <div className={styles.social}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<GoogleIcon />}
            onClick={onSignInWithGoogle}
          >
            Google
          </Button>
        </div>
        <Button variant="text" onClick={onForgotPasswordHandle}>
          Forgot password
        </Button>
      </form>
    </div>
  );
};

export default WineAppLoginPage;
