import React from 'react';

import MediaCard from '../../components/cards/media';

import { mergeClassNames } from '@utils/common';
import { useSearchData } from '../../store/search';

import styles from './style.module.scss';

const Artists = ({ gridLayout = false }) => {
  const { artists } = useSearchData();

  if (!artists) {
    return null;
  }

  return (
    <section className={mergeClassNames([styles.artists, gridLayout && styles.gridLayout])}>
      <p className={styles.title}>Artists</p>
      <div className={styles.cards}>
        {
          artists.data.map((item) => (
            <MediaCard
              key={item.id}
              image={item.image}
              title={item.name}
              className={styles.mediaCard}
            />
          ))
        }
      </div>
    </section>
  )
}

export default Artists;
