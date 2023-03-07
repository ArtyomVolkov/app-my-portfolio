import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import styles from './style.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <CircularProgress color="inherit" />
    </div>
  );
}

export default Loader;
