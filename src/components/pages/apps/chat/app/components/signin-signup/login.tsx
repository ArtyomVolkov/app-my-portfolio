import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';

import CircularLoader from '../../components/loaders/circular';

import { mergeClassNames } from '@utils/common';
import validations from '@utils/validations';

import { useStore } from '../../store';

import styles from './style.module.scss';

const Login = () => {
  const actions = useStore((store) => store.actions);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState({
    form: false,
    google: false,
  });
  const [validation, setValidation] = useState({
    email: '',
    password: ''
  });
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const onSubmit = async () => {
    setSubmitting({ ...submitting, form: true });
    const error = await actions.onSignIn(form.email, form.password);
    setSubmitting({ ...submitting, form: false });

    if (error) {
      setError(error);
    }
  };

  const onChangeFormField = (name, value) => {
    setError('');
    setForm({
      ...form,
      [name]: value
    });
    setValidation({
      ...validation,
      [name]: validations[name]?.(value)
    });
  };

  const onGoogleSignIn = async () => {
    setError("");
    setSubmitting({ ...submitting, google: true });
    const error = await actions.onSignInWithGoogle();
    setSubmitting({ ...submitting, google: false });
    setError(error);
  };

  const isSubmitDisabled = () => {
    return !!error
      || !form.email || !form.password
      || !!validation.email || !!validation.password;
  };

  return (
    <section
      className={mergeClassNames([
        styles.login,
        (submitting.form || submitting.google) && styles.submitting
      ])}>
      <form className={styles.formFields}>
        <div className={mergeClassNames([styles.field, validation.email && styles.invalid])}>
          <label htmlFor="login">Email</label>
          <input
            name="email"
            id="login"
            value={form.email}
            onChange={(e) => onChangeFormField('email', e.target.value)}
          />
        </div>
        <div className={mergeClassNames([styles.field, validation.password && styles.invalid])}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={(e) => onChangeFormField('password', e.target.value)}
          />
        </div>
      </form>
      {
        error && (
          <div className={styles.errorBox}>{error}</div>
        )
      }
      <div className={styles.actions}>
        <button className={styles.submit} onClick={onSubmit} disabled={isSubmitDisabled()}>
          {
            submitting.form && (
             <CircularLoader className={styles.loadingIcon} />
            )
          }
          <span>Submit</span>
        </button>
        <div className={styles.divider}>
          <hr/>
          <span>Social</span>
          <hr/>
        </div>
        <button onClick={onGoogleSignIn}>
          {
            submitting.google ?
              <CircularLoader className={styles.loadingIcon} />
              : <GoogleIcon/>
          }
          <span>Sign In with Google</span>
        </button>
      </div>
    </section>
  );
};

export default Login;