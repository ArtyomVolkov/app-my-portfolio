import React, { useEffect } from 'react';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../components/loader';
import MediaCard from '../../components/cards/media';

import { useAlbumsData } from '../../store/albums';
import { useArtistsActions } from '../../store/actions/albums';

import styles from './style.module.scss';

const AlbumsPage = () => {
  const { loading, albums } = useAlbumsData();
  const { onFetchAlbums } = useArtistsActions();

  useEffect(() => {
    onFetchAlbums().then();
  }, []);

  const renderAlbums = () => {
    if (loading) {
      return <Loader />;
    }
    if (!albums) {
      return null;
    }
    return (
      <section className={styles.albumCards}>
        {
          albums.map((item) => (
            <MediaCard
              key={item.id}
              image={item.image}
              title={item.name}
              subtitle={`${item.totalTracks} Tracks`}
            />
          ))
        }
      </section>
    );
  };

  return (
    <div className={styles.albums}>
      <div className={styles.header}>
        <p className={styles.title}>Albums</p>
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

export default AlbumsPage;
