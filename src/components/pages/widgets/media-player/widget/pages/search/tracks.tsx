import React from 'react';
import { useSelector } from 'react-redux';

import TrackList from '../../components/track-list';

import sharedActions from '../../store/actions/shared';
import { mergeClassNames } from '@utils/common';

import { IStore } from '@pages/widgets/media-player/widget/store';

import styles from './style.module.scss';

const Tracks = ({ gridLayout = false }) => {
  const tracks = useSelector((store: IStore) => store.search.tracks);

  const onSetPlayTrack = async (uri) => {
    await sharedActions.onSetActiveTrack(null, tracks, uri);
  }

  if (!tracks) {
    return null;
  }

  return (
    <section className={mergeClassNames([styles.tracks, gridLayout && styles.gridLayout ])}>
      <p className={styles.title}>Tracks</p>
      <TrackList
        trackNamePriority="track"
        data={tracks}
        onSetPlayTrack={onSetPlayTrack}
      />
    </section>
  )
}

export default Tracks;
