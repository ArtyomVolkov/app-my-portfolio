import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Loader = ({ className = null }) => {
  return (
    <div className={mergeClassNames([styles.loader, className])}>
      <CircularProgress color="inherit" />
    </div>
  );
}

export default Loader;
