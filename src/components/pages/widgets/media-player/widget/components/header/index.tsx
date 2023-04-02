import React from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import IconButton from '@mui/material/IconButton';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';

import { useLayoutData } from '../../store';

import styles from './style.module.scss';

interface IHeader {
  title: string,
  useHistory?: boolean
}

const Header: React.FC<IHeader> = ({ title, useHistory }) => {
  const navigation = useNavigate();
  const [fullScreen, toggleFullScreen] = useLayoutData((state) => [
    state.fullScreen,
    state.toggleFullScreen
  ], shallow);

  const onGoBack = () => {
    navigation(-1);
  };

  return (
    <div className={styles.header}>
      <div className={styles.headline}>
        {
          useHistory && (
            <IconButton className={styles.backButton} onClick={onGoBack}>
              <ChevronLeftRoundedIcon />
            </IconButton>
          )
        }
        <p className={styles.title}>{ title }</p>
      </div>
      <IconButton className={styles.fullscreen} onClick={toggleFullScreen}>
        {
          fullScreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />
        }
      </IconButton>
    </div>
  );
}

export default Header;