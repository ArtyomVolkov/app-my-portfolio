import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ScrollViewGradient from '@shared/components/scroll-view';
import MediaCard from '../../components/cards/media';
import Loader from '../../components/loader';

import { useArtistsActions } from '../../store/actions/artists';
import { useArtistsData } from '../../store/artists';

import styles from './style.module.scss';

const ArtistsPage = () => {
  const navigation = useNavigate();
  const { loading, artists } = useArtistsData();
  const { onFetchArtists } = useArtistsActions();

  useEffect(() => {
    onFetchArtists().then();
  }, []);

  const onOpenArtistPage = (artistId) => {
    navigation(artistId);
  };

  const renderArtists = () => {
    if (loading) {
      return <Loader />;
    }
    if (!artists) {
      return null;
    }
    return (
      <section className={styles.artistsCards}>
        {
          artists.map((item) => (
            <MediaCard
              key={item.id}
              image={item.image}
              title={item.name}
              onPress={() => onOpenArtistPage(item.id)}
            />
          ))
        }
      </section>
    );
  };

  return (
    <div className={styles.artists}>
      <div className={styles.header}>
        <p className={styles.title}>Artists</p>
      </div>
      <div className={styles.body}>
        <ScrollViewGradient gateHeight={30}>
          {
            renderArtists()
          }
        </ScrollViewGradient>
      </div>
    </div>
  );
}

export default ArtistsPage;
