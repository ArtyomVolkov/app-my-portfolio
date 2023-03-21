import React from 'react';

import { useUserData } from '../../store/user';

import styles from './style.module.scss';
import MediaCard from '@pages/widgets/media-player/widget/components/cards/media';

const TopArtists = () => {
  const { topArtists } = useUserData();

  if (!topArtists) {
    return null;
  }

  console.log(topArtists);
  return (
    <article className={styles.topArtists}>
      <p className={styles.title}>My Top Artists</p>
      <section className={styles.artistsCards}>
        {
          topArtists.map((item) => (
            <MediaCard
              key={item.id}
              image={item.image}
              title={item.name}
              className={styles.artistCard}
            />
          ))
        }
      </section>
    </article>
  );
}

export default TopArtists;
