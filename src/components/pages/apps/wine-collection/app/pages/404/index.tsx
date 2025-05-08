import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

import styles from './style.module.scss';

const WineAppPage404 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wineAppPage404}>
      <div className={styles.viewBox}>
        <FindInPageOutlinedIcon className={styles.icon} />
        <span className={styles.title}>404</span>
        <span className={styles.subtitle}>Page Not Found.</span>
        <span className={styles.description}>
          Sorry, we can't find the page you were looking for.
        </span>
        <Button onClick={() => navigate('/apps/wine-collection')}>Back to Home page</Button>
      </div>
    </div>
  )
};

export default WineAppPage404;