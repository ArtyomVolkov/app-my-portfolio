import React, { useEffect, useState } from 'react';

import SunIcon from '@mui/icons-material/LightModeOutlined';
import MoonIcon from '@mui/icons-material/DarkModeOutlined';
import { useAppStore } from '@store/app';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

type ISwitcher = {
  className?: string;
};

const ThemeSwitcher: React.FC<ISwitcher> = ({ className }) => {
  const appStore = useAppStore();
  const [darkMode, setDarkMode] = useState<boolean>(
    appStore.theme.includes('dark')
  );

  useEffect(() => {
    // setDarkMode(appStore.theme.includes("dark"));
  }, [appStore.theme]);

  const onToggle = () => {
    setDarkMode((prev) => !prev);
    appStore.setTheme(darkMode ? 'light' : 'dark');
  };

  return (
    <div
      onClick={onToggle}
      className={mergeClassNames([styles.ThemeSwitcher, className])}
    >
      <div className={styles.switcherBox}>
        <span
          className={mergeClassNames([
            styles.circleBox,
            !darkMode && styles.checked,
          ])}
        >
          <SunIcon />
        </span>
        <span
          className={mergeClassNames([
            styles.circleBox,
            darkMode && styles.checked,
          ])}
        >
          <MoonIcon />
        </span>
      </div>
      <span
        className={mergeClassNames([
          styles.circleShadow,
          darkMode && styles.transform,
        ])}
      />
    </div>
  );
};

export default ThemeSwitcher;
