import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';

import { IStore } from '../../store';
import actions from '../../store/actions/app';

import styles from './style.module.scss';

interface IHeader {
  title: string,
  useHistory?: boolean
}

const Header: React.FC<IHeader> = ({ title, useHistory }) => {
  const navigation = useNavigate();
  const fullScreen = useSelector((state: IStore) => state.app.fullScreen);

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
      <IconButton className={styles.fullscreen} onClick={actions.toggleFullScreen}>
        {
          fullScreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />
        }
      </IconButton>
    </div>
  );
}

export default Header;