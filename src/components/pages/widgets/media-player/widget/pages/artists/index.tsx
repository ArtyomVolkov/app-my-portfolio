import React, { useEffect } from 'react';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../components/loader';

import { useArtistsActions } from '../../store/actions/artists';
import { useArtistsData } from '../../store/artists';

import styles from './style.module.scss';

const ArtistsPage = () => {
  const { loading, artists } = useArtistsData();
  const { onFetchArtists } = useArtistsActions();

  useEffect(() => {
    onFetchArtists().then();
  }, []);

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
            <div key={item.id} className={styles.artistCard}>
              <div className={styles.image}>
                <img
                  alt="Artist"
                  src={item.images[0]?.url}
                />
              </div>
              <div className={styles.captions}>
                <label className={styles.name}>{ item.name }</label>
              </div>
            </div>
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
