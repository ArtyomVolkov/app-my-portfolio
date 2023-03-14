import React, { useEffect } from 'react';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../components/loader';
import TrackList from '../../components/track-list';

import { useFavoriteTracksActions } from '../../store/actions/tracks';
import { useFavoriteTracksData } from '../../store/tracks';

import styles from './style.module.scss';

const TracksPage = () => {
  const { onFetchData } = useFavoriteTracksActions();
  const { tracks, loading } = useFavoriteTracksData();

  useEffect(() => {
    onFetchData().then();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (!tracks) {
      return null;
    }
    return (
      <TrackList data={tracks} />
    );
  };

  return (
    <div className={styles.favoriteTracks}>
      <p className={styles.title}>Favorite Tracks</p>
      <div className={styles.trackList}>
        <ScrollViewGradient gateHeight={30}>
          {
            renderContent()
          }
        </ScrollViewGradient>
      </div>
    </div>
  );
}

export default TracksPage;
