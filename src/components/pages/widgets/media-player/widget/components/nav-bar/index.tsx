import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import AudioTrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AlbumIcon from '@mui/icons-material/Album';

import { mergeClassNames } from '@utils/common';
import { getRotePaths } from '../../utils/common';

import { IStore } from '../../store';
import appActions from '../../store/actions/app';

import styles from './style.module.scss';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store: IStore) => store.user.data);
  const fullWidth = useSelector((store: IStore) => store.app.fullWidth);

  const navItems = useMemo(() => {
    if (!user) {
      return [
        { label: 'Login', icon: <LoginRoundedIcon />, path: 'login'},
      ]
    }
    return [
      { label: 'User', icon: <AccountBoxRoundedIcon />, path: 'user'},
      { label: 'Search', icon: <ContentPasteSearchRoundedIcon />, path: 'search'},
      { label: 'Albums', icon: <AlbumIcon />, path: 'albums'},
      { label: 'Artists', icon: <AssignmentIndRoundedIcon />, path: 'artists'},
      { label: 'Play Lists', icon: <QueueMusicRoundedIcon />, path: 'playlists'},
      { label: 'Tracks', icon: <AudioTrackRoundedIcon />, path: 'tracks'},
    ]
  }, [user]);

  const activePath = useMemo(() => {
    return getRotePaths(location.pathname);
  }, [location.pathname]);

  const navigateTo = (path) => {
    if (!location.pathname.includes(path)) {
      navigate(path);
    }
  };

  return (
    <div className={mergeClassNames([styles.navBar, fullWidth && styles.small])}>
      <IconButton onClick={appActions.toggleWidth} className={styles.layoutIcon}>
        <MenuRoundedIcon />
      </IconButton>
      <div className={styles.navItems}>
        {
          navItems.map((item) => (
            <Button
              key={item.path}
              size="large"
              startIcon={item.icon}
              classes={{
                startIcon: styles.muiStartIcon
              }}
              className={mergeClassNames([
                styles.navItem,
                item.path === 'search' && activePath.includes('') ? styles.active :
                activePath.includes(item.path) && styles.active
              ])}
              onClick={() => navigateTo(item.path)}
            >
              { item.label }
            </Button>
          ))
        }
      </div>
      <div className={styles.settings}>
        <Button size="large" startIcon={<SettingsIcon />}>Settings</Button>
      </div>
    </div>
  )
}

export default NavBar;
