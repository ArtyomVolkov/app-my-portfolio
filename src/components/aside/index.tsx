import React from 'react';

import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';

import Navigation from '@components/aside/navigation';

import STORE from '@store/app';

import styles from './style.module.scss';

const SideBar = ({ fullWidth }) => {
  return (
    <aside className={styles.sideBar}>
      <div className={styles.header}>
        <IconButton className={styles.screenResize} onClick={STORE.toggleFullWidth}>
          { fullWidth ? <MenuRoundedIcon className={styles.icon} /> : <MenuOpenRoundedIcon className={styles.icon} />}
        </IconButton>
        <div className={styles.appLogo}>
          App Portfolio
        </div>
      </div>
      <Navigation />
    </aside>
  );
};

export default SideBar;
