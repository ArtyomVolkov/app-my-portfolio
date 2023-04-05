import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NoteRoundedIcon from '@mui/icons-material/NoteRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import Header from '../../components/header';
import Followers from '../../components/labels/followers';
import MediaBanner from '../../components/cards/media-banner';
import TopArtists from './top-artists';

import { IStore } from '../../store';
import actions from '../../store/actions/user';

import styles from './style.module.scss';

const UserPage = () => {
  const navigation = useNavigate();
  const user = useSelector((store: IStore) => store.user.data);

  const onLogout = () => {
    actions.onLogout(navigation);
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.userPage}>
      <Header title="User" />
      <ScrollViewGradient gateHeight={35}>
        <>
          <MediaBanner image={user.image} title={user.name}>
            <div className={styles.logout}>
              <Button
                color="inherit"
                variant="outlined"
                startIcon={<LogoutRoundedIcon />}
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
            <div className={styles.userCaption}>
              <label className={styles.email}>{ user.email }</label>
            </div>
            <section className={styles.socialPanel}>
              <label className={styles.country}>
                <img src={`https://flagcdn.com/w40/${user.country}.png`} alt="country" />
              </label>
              <label className={styles.followers}>
                <PeopleAltRoundedIcon />
                <Followers value={user.followers} />
              </label>
              <label className={styles.product}>
                <NoteRoundedIcon />
                <span className={styles.subscription}>{ user.product }</span>
              </label>
              <label>
                <Link
                  href={user.spotifyURL}
                  className={styles.spotifyLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  <LaunchRoundedIcon />
                  <span>spotify</span>
                </Link>
              </label>
            </section>
          </MediaBanner>
          <TopArtists />
        </>
      </ScrollViewGradient>
    </div>
  );
}

export default UserPage;
