import React from 'react';
import { useNavigate } from 'react-router-dom';

import MediaCard from '../../components/cards/media';

import { useUserData } from '../../store/user';

import styles from './style.module.scss';

const TopArtists = () => {
  const navigation = useNavigate();
  const { topArtists } = useUserData();

  const onOpenArtistsPage = (id) => {
    navigation(`artist/${id}`);
  };

  if (!topArtists) {
    return null;
  }

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
              onPress={() => onOpenArtistsPage(item.id)}
            />
          ))
        }
      </section>
    </article>
  );
}

export default TopArtists;
