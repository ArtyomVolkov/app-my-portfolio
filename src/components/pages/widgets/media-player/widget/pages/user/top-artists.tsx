import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MediaCard from '../../components/cards/media';
import Loader from '../../components/loader';

import { IStore } from '../../store';
import actions from '../../store/actions/user';

import styles from './style.module.scss';

const TopArtists = () => {
  const navigation = useNavigate();
  const loading = useSelector((store: IStore) => store.user.loading);
  const topArtists = useSelector((store: IStore) => store.user.topArtists);

  useEffect(() => {
    actions.onFetchTopArtists().then();
  }, []);

  const onOpenArtistsPage = (id) => {
    navigation(`artist/${id}`);
  };

  return (
    <article className={styles.topArtists}>
      {
        loading && <Loader />
      }
      {
        topArtists && (
          <>
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
          </>
        )
      }
    </article>
  );
}

export default TopArtists;
