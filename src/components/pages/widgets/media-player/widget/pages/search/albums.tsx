import React from 'react';

import MediaCard from '../../components/cards/media';
import ScrollViewGradient from '@shared/components/scroll-view/horizontal';

import { useSearchData } from '../../store/search';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Albums = ({ gridLayout = false }) => {
  const albums = useSearchData((state) => state.albums);

  if (!albums) {
    return null;
  }

  return (
    <section className={mergeClassNames([styles.albums, gridLayout && styles.gridLayout])}>
      <p className={styles.title}>Albums</p>
      <ScrollViewGradient>
        <div className={styles.cards}>
          {
            albums.data.map((item) => (
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

export default Albums;
