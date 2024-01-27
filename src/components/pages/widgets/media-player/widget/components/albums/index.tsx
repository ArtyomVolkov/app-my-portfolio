import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../components/loader';
import Header from '../../components/header';
import MediaCard from '../../components/cards/media';

import { IAlbum } from '../../shared/interfaces/music-store';

import styles from './style.module.scss';

interface IAlbums {
  albums: {
    loading: boolean,
    data: Array<IAlbum>,
  },
  actions: {
    onFetchAlbums: () => Promise<any>,
    [key: string]: any,
  }
}

const Albums: React.FC<IAlbums> = ({ actions, albums }) => {
  const navigation = useNavigate();

  useEffect(() => {
    actions.onFetchAlbums().then();
  }, []);

  const onOpenAlbumDetails = (id) => {
    navigation(id);
  };

  const renderAlbums = () => {
    if (albums.loading) {
      return <Loader />;
    }
    if (!albums.data) {
      return null;
    }
    return (
      <section className={styles.albumCards}>
        {
          albums.data.map((item) => (
            <MediaCard
              key={item.id}
              image={item.image}
              title={item.name}
              subtitle={`${item.totalTracks} Tracks`}
              onPress={() => onOpenAlbumDetails(item.id)}
            />
          ))
        }
      </section>
    );
  };

  return (
    <div className={styles.albums}>
      <div className={styles.header}>
        <Header title="Albums" />
      </div>
      <div className={styles.body}>
        <ScrollViewGradient gateHeight={30}>
          {
            renderAlbums()
          }
        </ScrollViewGradient>
      </div>
    </div>
  );
}

export default Albums;
