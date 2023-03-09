import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ScrollViewGradient from '@shared/components/scroll-view';
import MediaCard from '../../components/cards/media';
import Loader from '../../components/loader';

import { usePlayListsActions } from '../../store/actions/playlists';
import { usePlaylistsData } from '../../store/playlists';

import styles from './style.module.scss';

const PlayListsPage = () => {
  const navigation = useNavigate();
  const { onFetchPlaylists } = usePlayListsActions();
  const { loading, playlists } = usePlaylistsData();

  useEffect(() => {
    onFetchPlaylists().then();
  }, []);

  const onOpenPlayList = (id) => {
    navigation(id);
  };

  const renderMainContent = () => {
    if (loading) {
      return <Loader />;
    }

    return (
      <section className={styles.playListCards}>
        {
          playlists.map((item) => (
            <MediaCard
              key={item.id}
              image={item.images[0]?.url}
              title={item.name}
              subtitle={`${item.tracks.total} Tracks`}
              className={styles.playList}
              onPress={() => onOpenPlayList(item.id)}
            />
          ))
        }
      </section>
    );
  };

  return (
    <div className={styles.playLists}>
      <p className={styles.title}>Playlists</p>
      <ScrollViewGradient gateHeight={30}>
        {
          renderMainContent()
        }
      </ScrollViewGradient>
    </div>
  );
}

export default PlayListsPage;
