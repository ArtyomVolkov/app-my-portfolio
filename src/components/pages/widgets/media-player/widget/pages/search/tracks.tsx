import React from 'react';

import TrackList from '../../components/track-list';

import { useSearchData } from '../../store/search';
import { useSharedActions } from '../../store/actions/shared';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Tracks = ({ gridLayout = false }) => {
  const tracks = useSearchData((state) => state.tracks);
  const { onSetActiveTrack } = useSharedActions()

  const onSetPlayTrack = async (uri) => {
    await onSetActiveTrack(null, tracks.data, uri);
  }

  if (!tracks) {
    return null;
  }

  return (
    <section className={mergeClassNames([styles.tracks, gridLayout && styles.gridLayout ])}>
      <p className={styles.title}>Tracks</p>
      <TrackList
        trackNamePriority="track"
        data={tracks.data}
        onSetPlayTrack={onSetPlayTrack}
      />
    </section>
  )
}

export default Tracks;
