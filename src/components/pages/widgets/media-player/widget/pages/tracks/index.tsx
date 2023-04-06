import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ScrollViewGradient from '@shared/components/scroll-view';
import Header from '../../components/header';
import Loader from '../../components/loader';
import TrackList from '../../components/track-list';

import { IStore } from '../../store';
import favoriteTracksActions from '../../store/actions/favorite-tracks';

import styles from './style.module.scss';

const TracksPage = () => {
  const favoriteTracks = useSelector((store: IStore) => store.favoriteTracks);

  useEffect(() => {
    favoriteTracksActions.onFetchFavoriteTracks().then();
  }, []);

  const renderContent = () => {
    if (favoriteTracks.loading) {
      return <Loader />;
    }
    if (!favoriteTracks.tracks) {
      return null;
    }
    return (
      <TrackList
        trackNamePriority="track"
        data={favoriteTracks.tracks}
        onSetPlayTrack={favoriteTracksActions.onSetPlayTrack}
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
