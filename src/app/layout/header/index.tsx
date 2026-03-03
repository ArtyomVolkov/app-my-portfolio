import { useState } from 'react';

import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';

import Breadcrumbs from '@shared/components/breadcrumbs';
import ThemeSwitcher from '@shared/components/theme-switcher';

import Navigation from '@app/layout/sidebar/navigation';

import { RESIZE } from '@shared/constants/layout';
import { useResizeChange } from '@shared/hooks/layout';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useResizeChange((width: number) => {
    if (width >= RESIZE.tablet) {
      setIsDrawerOpen((isOpen) => {
        if (isOpen) {
          return false;
        }
        return isOpen;
      });
    }
  });

  const onToggleMenu = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className={styles.appHeader}>
      <IconButton className={styles.menuIcon} onClick={onToggleMenu}>
        <MenuOpenRoundedIcon
          className={mergeClassNames([
            styles.icon,
            !isDrawerOpen && styles.rotate,
          ])}
        />
      </IconButton>
      <div className={styles.headerContent}>
        <Breadcrumbs className={styles.breadcrumbs} />
        <ThemeSwitcher className={styles.themeSwitcher} />
      </div>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={onToggleMenu}
        className={styles.MuiDrawer}
        classes={{
          paper: styles.MuiDrawerPaper,
        }}
      >
        <div className={styles.drawerContent}>
          <div className={styles.header}>
            <IconButton className={styles.menuIcon} onClick={onToggleMenu}>
              <MenuOpenRoundedIcon />
            </IconButton>
            <div className={styles.appLogo}>
              <span>Portfolio App</span>
            </div>
          </div>
          <Navigation />
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
