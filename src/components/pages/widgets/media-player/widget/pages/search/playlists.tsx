import React from 'react';

import MediaCard from '../../components/cards/media';
import ScrollViewGradient from '@shared/components/scroll-view/horizontal';

import { useSearchData } from '../../store/search';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Playlists = ({ gridLayout = false }) => {
  const playlists = useSearchData((state) => state.playlists);

  if (!playlists) {
    return null;
  }

  return (
    <section className={mergeClassNames([styles.playlists, gridLayout && styles.gridLayout])}>
      <p className={styles.title}>Playlists</p>
      <ScrollViewGradient>
        <div className={styles.cards}>
          {
            playlists.data.map((item) => (
              <MediaCard
                key={item.id}
                image={item.image}
                title={item.name}
                subtitle={`${item.totalTracks} Tracks`}
                className={styles.mediaCard}
              />
            ))
          }
        </div>
      </ScrollViewGradient>
    </section>
  )
}

export default Playlists;
