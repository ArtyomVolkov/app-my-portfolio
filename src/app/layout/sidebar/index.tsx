import IconButton from '@mui/material/IconButton';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';

import Navigation from '@app/layout/sidebar/navigation';

import { useAppStore } from '@store/app';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const SideBar = () => {
  const appStore = useAppStore();

  return (
    <aside className={styles.sideBar}>
      <div className={styles.header}>
        <IconButton
          className={styles.screenResize}
          onClick={appStore.toggleFullWidth}
          aria-label="toggle-sidebar"
        >
          {appStore.layout.fullWidth ? (
            <MenuOpenRoundedIcon
              className={mergeClassNames([styles.icon, styles.rotate])}
            />
          ) : (
            <MenuOpenRoundedIcon className={styles.icon} />
          )}
        </IconButton>
        <div className={styles.appLogo}>
          <span>Portfolio App</span>
        </div>
      </div>
      <Navigation />
    </aside>
  );
};

export default SideBar;
