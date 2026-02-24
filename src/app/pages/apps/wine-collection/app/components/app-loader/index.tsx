import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import styles from './style.module.scss';

const AppLoader = () => {
  return (
    <div className={styles.appLoader}>
      <CircularProgress />
      <span className={styles.title}>Loading app...</span>
    </div>
  );
};

export default AppLoader;