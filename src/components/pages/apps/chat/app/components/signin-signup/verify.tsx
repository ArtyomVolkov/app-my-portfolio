import React, { useState } from 'react';

import Alert from '../../components/alert';
import CircularLoader from '../../components/loaders/circular';

import { useAuthStore } from '../../store/auth';

import styles from './style.module.scss';

const VerifyEmail = () => {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const actions = useAuthStore((store) => store.actions);

  const onSendEmailVerify = async () => {
    setSubmitting(true);
    const error = await actions.onSendEmailVerification();
    setSubmitting(false);

    if (error) {
      setError(error);
    }
  };

  return (
    <section className={styles.verifyEmail}>
      <Alert
        variant="info"
        message="Check your mail box and confirm email address to finish authorization."
      />
      {
        error && (
          <Alert variant="error" message={error} onClose={() => setError(null)} />
        )
      }
      <hr />
      <button className={styles.outlined} onClick={onSendEmailVerify} disabled={submitting}>
        {
          submitting && <CircularLoader />
        }
        <span>Send again</span>
      </button>
      <button onClick={actions.onSignOut}>Sign In</button>
    </section>
  )
};

export default VerifyEmail;