import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ScrollViewGradient from '@shared/components/scroll-view';
import Header from '../../components/header';
import Loader from '../../components/loader';
import MediaCard from '../../components/cards/media';

import { IArtist } from '../../shared/interfaces/music-store';

import styles from './style.module.scss';

interface IArtists {
  artists: {
    loading: boolean,
    data: Array<IArtist>,
  },
  actions: {
    onFetchArtists: () => Promise<any>
  }
}

const Artists: React.FC<IArtists> = ({ actions, artists }) => {
  const navigation = useNavigate();

  useEffect(() => {
    actions.onFetchArtists().then();
  }, []);

  const onOpenArtistPage = (artistId) => {
    navigation(artistId);
  };

  const renderArtists = () => {
    if (artists.loading) {
      return <Loader />;
    }
    if (!artists.data) {
      return null;
    }
    return (
      <section className={styles.artistsCards}>
        {
          artists.data.map((item) => (
            <MediaCard
              key={item.id}
              image={item.image}
              title={item.name}
              subtitle={`${item.followers.toLocaleString()} followers`}
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

export default Artists;
