import React from 'react';

import MediaCard from '../../components/cards/media';
import ScrollViewGradient from '@shared/components/scroll-view/horizontal';

import { mergeClassNames } from '@utils/common';
import { useSearchData } from '../../store/search';

import styles from './style.module.scss';

const Artists = ({ gridLayout = false }) => {
  const artists = useSearchData((state) => state.artists);

  if (!artists) {
    return null;
  }

  return (
    <section className={mergeClassNames([styles.artists, gridLayout && styles.gridLayout])}>
      <p className={styles.title}>Artists</p>
      <ScrollViewGradient>
        <div className={styles.cards}>
          {
            artists.data.map((item) => (
              <MediaCard
                key={item.id}
                image={item.image}
                title={item.name}
                subtitle={`${item.followers.toLocaleString()} followers`}
                className={styles.mediaCard}
              />
            ))
          }
        </div>
      </ScrollViewGradient>
    </section>
  )
}

export default Artists;