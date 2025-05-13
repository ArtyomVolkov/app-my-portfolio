import React, { useState } from 'react';

import CircularLoader from '../../components/loaders/circular';

import { useStore } from '../../store';

import { mergeClassNames } from '@utils/common';
import validations from '@utils/validations';

import styles from './style.module.scss';

const SignUp = () => {
  const actions = useStore((store) => store.actions);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [validation, setValidation] = useState({
    email: '',
    password: ''
  });
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const onChangeFormField = (name, value) => {
    setForm({
      ...form,
      [name]: value
    });
    setValidation({
      ...validation,
      [name]: validations[name]?.(value)
    });
  };

  const onSubmit = async () => {
    setSubmitting(true);
    const error = await actions.onSignUp(form.email, form.password);
    setSubmitting(false);

    if (error) {
      setError(error);
    }
  };

  const isSubmitDisabled = () => {
    return !!error
      || !form.email || !form.password
      || !!validation.email || !!validation.password;
  };

  return (
    <section className={mergeClassNames([styles.login, submitting && styles.submitting])}>
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
      <div className={styles.actions}>
        <button className={styles.submit} onClick={onSubmit} disabled={isSubmitDisabled()}>
          {
            submitting && <CircularLoader className={styles.loadingIcon} />
          }
          <span>Submit</span>
        </button>
      </div>
    </section>
  );
};

export default SignUp;