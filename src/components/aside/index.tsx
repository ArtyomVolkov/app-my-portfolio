import React from 'react';

import IconButton from '@mui/material/IconButton';
import ArrowRight from '@mui/icons-material/KeyboardArrowRightRounded';

import Avatar from '@components/aside/avatar';
import Navigation from '@components/aside/navigation';

import Image from '@assets/images/a.volkov.png';

import STORE from '@store/app';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const SideBar = ({ fullWidth }) => {
  return (
    <aside className={styles.sideBar}>
      <Avatar
        title="Artem Volkov"
        subtitle="SR. FrontEnd engineer"
        image={Image}
      />
      <IconButton className={styles.screenResize} onClick={STORE.toggleFullWidth} aria-label="arrow-button">
        <ArrowRight className={mergeClassNames([styles.icon, !fullWidth && styles.left])} />
      </IconButton>
      <Navigation />
    </aside>
  );
};

export default SideBar;
