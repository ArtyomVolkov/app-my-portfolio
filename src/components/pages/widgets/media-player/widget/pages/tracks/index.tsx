import React, { useEffect } from 'react';

import ScrollViewGradient from '@shared/components/scroll-view';
import Header from '../../components/header';
import Loader from '../../components/loader';
import TrackList from '../../components/track-list';

import { useFavoriteTracksActions } from '../../store/actions/tracks';
import { useFavoriteTracksData } from '../../store/tracks';

import styles from './style.module.scss';

const TracksPage = () => {
  const { onFetchData, onSetPlayTrack } = useFavoriteTracksActions();
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
      <TrackList
        trackNamePriority="track"
        data={tracks}
        onSetPlayTrack={onSetPlayTrack}
      />
    );
  };

  return (
    <div className={styles.favoriteTracks}>
      <Header title="Favorite Tracks" />
      <ScrollViewGradient gateHeight={30}>
      <div className={styles.trackList}>
        { renderContent() }
      </div>
      </ScrollViewGradient>
    </div>
  );
}

export default TracksPage;
