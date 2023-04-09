import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../components/loader';
import Header from '../../components/header';
import MediaCard from '../../components/cards/media';

import { IPlaylist } from '../../shared/interfaces/music-store';

import styles from './style.module.scss';

interface IPlaylists {
  playlists: {
    loading: boolean,
    data: Array<IPlaylist>,
  },
  actions: {
    onFetchPlaylists: () => Promise<any>
  }
}

const Playlists: React.FC<IPlaylists> = ({ actions, playlists }) => {
  const navigation = useNavigate();

  useEffect(() => {
    actions.onFetchPlaylists().then();
  }, []);

  const onOpenPlayList = (id) => {
    navigation(id);
  };

  const renderMainContent = () => {
    if (playlists.loading) {
      return <Loader />;
    }

    if (!playlists.data) {
      return null;
    }

    return (
      <section className={styles.playListCards}>
        {
          playlists.data.map((item) => (
            <MediaCard
              key={item.id}
              image={item.image}
              title={item.name}
              subtitle={`${item.totalTracks} Tracks`}
              onPress={() => onOpenPlayList(item.id)}
            />
          ))
        }
      </section>
    );
  };

  return (
    <div className={styles.playLists}>
      <Header title="Playlists" />
      <ScrollViewGradient gateHeight={30}>
        {
          renderMainContent()
        }
      </ScrollViewGradient>
    </div>
  );
}

export default Playlists;
