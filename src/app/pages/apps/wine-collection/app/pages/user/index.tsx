import React from 'react';
import { useNavigate } from 'react-router-dom';

import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useStore } from '../../store';

import styles from './style.module.scss';

const UserPage = () => {
  const navigate = useNavigate();
  const { user, wineList, actions } = useStore((store) => store);

  return (
    <div className={styles.wineAppUserPage}>
      <IconButton className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowBackRoundedIcon />
      </IconButton>
      <div className={styles.userDetails}>
        <img src={user.photoURL} alt={user.displayName} className={styles.userImage} />
        <span className={styles.displayName}>{user.displayName}</span>
        <span className={styles.email}>{user.email}</span>
        <div className={styles.info}>
          <div className={styles.row}>
            <span>Wine count:</span>
            <span>{`${wineList.data?.length || 0}`}</span>
          </div>

          <div className={styles.row}>
            <span>Phone:</span>
            <span>{user.phoneNumber || 'N/A'}</span>
          </div>
          <div className={styles.row}>
            <span>Created:</span>
            <span>{` ${new Date(+user.createdAt).toDateString()}`}</span>
          </div>
          <div className={styles.row}>
            <span>Last login:</span>
            <span>{` ${new Date(+user.lastLoginAt).toDateString()}`}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant="outlined" color="inherit" onClick={actions.onSignOut} startIcon={<ExitToAppRoundedIcon />}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;