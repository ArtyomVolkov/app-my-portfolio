import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ScrollViewGradient from '@shared/components/scroll-view';
import Header from '../../components/header';
import Loader from '../../components/loader';
import MediaCard from '../../components/cards/media';

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
      <Header title="Artists" />
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
