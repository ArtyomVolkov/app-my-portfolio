import React from 'react';

import MediaCard from '../../components/cards/media';

import { useSearchData } from '../../store/search';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Albums = ({ gridLayout = false }) => {
  const { albums } = useSearchData();

  if (!albums) {
    return null;
  }

  return (
    <section className={mergeClassNames([styles.albums, gridLayout && styles.gridLayout])}>
      <p className={styles.title}>Albums</p>
      <div className={styles.cards}>
        {
          albums.data.map((item) => (
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

export default Albums;
