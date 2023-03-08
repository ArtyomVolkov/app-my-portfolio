import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ScrollViewGradient from '@shared/components/scroll-view';
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
            <div
              key={item.id}
              className={styles.playList}
              onClick={() => onOpenPlayList(item.id)}
            >
              <div className={styles.tracksCount}>
                { `${item.tracks.total} tracks` }
              </div>
              <div className={styles.image}>
                <img
                  alt="playlist"
                  src={item.images[0]?.url}
                />
              </div>
              <div className={styles.captions}>
                <label className={styles.name}>{ item.name }</label>
                <label className={styles.owner}>{ item.owner.display_name }</label>
              </div>
            </div>
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
