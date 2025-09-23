import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import styles from './style.module.scss';

interface NavButton {
  path: string,
  icon: React.ComponentElement<any, any>,
  title: string,
}

const NavButton: React.FC<NavButton> = ({ path, title, icon }) => {
  const navigation = useNavigate();

  const navigateTo = () => {
    navigation(path);
  };

  return (
    <Button className={styles.navButton} onClick={navigateTo} color="inherit">
      <div className={styles.iconBox}>
        { icon }
      </div>
      <p className={styles.headline}>
        { title }
      </p>
    </Button>
  );
}

export default NavButton;
