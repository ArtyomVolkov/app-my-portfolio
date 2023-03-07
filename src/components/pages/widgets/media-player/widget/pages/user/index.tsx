import React, { useEffect, useState } from 'react';

import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NoteRoundedIcon from '@mui/icons-material/NoteRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import TrackList from '@pages/widgets/media-player/widget/components/track-list';

import { useUserData } from '../../store';
import { useUserActions } from '../../store/actions/user';
import { useAuthActions } from '../../store/actions/auth';

import styles from './style.module.scss';

const UserPage = () => {
  const { user } = useUserData();
  const { onLogout } = useAuthActions();
  const [tracks, setTracks] = useState([]);
  const { onFetchTopItems } = useUserActions();

  useEffect(() => {
    onFetchTopItems().then((data) => {
      setTracks(data.items);
    });
  }, []);

  return (
    <div className={styles.userPage}>
      <section className={styles.userHeadline}>
        <Avatar alt="User" src={user.images[0]?.url} className={styles.userImage} />
        <div className={styles.userCaption}>
          <label className={styles.country}>
            <img src={`https://flagcdn.com/w40/${user.country.toLowerCase()}.png`} alt="country" />
          </label>
          <label className={styles.fullName}>{ user.display_name }</label>
          <label className={styles.email}>{ user.email }</label>
        </div>
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
      </section>
      <section className={styles.socialPanel}>
        <label className={styles.followers}>
          <PeopleAltRoundedIcon />
          <span>followers:</span>
          <span className={styles.total}>{ user.followers.total }</span>
        </label>
        <label className={styles.product}>
          <NoteRoundedIcon />
          <span>subscription:</span>
          <span className={styles.subscription}>{ user.product }</span>
        </label>
        <label>
          <Link
            href={user.external_urls.spotify}
            className={styles.spotifyLink}
            rel="noreferrer"
            target="_blank"
          >
            <LaunchRoundedIcon />
            <span>spotify</span>
          </Link>
        </label>
      </section>
      <section className={styles.topTracks}>
        <p className={styles.title}>My Top tracks</p>
        <ScrollViewGradient gateHeight={50}>
          <TrackList data={tracks} />
        </ScrollViewGradient>
      </section>
    </div>
  );
}

export default UserPage;
