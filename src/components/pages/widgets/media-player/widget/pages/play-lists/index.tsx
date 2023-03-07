import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScrollViewGradient from '@shared/components/scroll-view';

import { usePlayListsActions } from '../../store/actions/playlists';

import styles from './style.module.scss';

const PlayListsPage = () => {
  const navigation = useNavigate();
  const { onFetchPlaylists } = usePlayListsActions();
  const [playLists, setPlayLists] = useState([]);

  useEffect(() => {
    onFetchPlaylists().then((data) => {
      setPlayLists(data.items);
    });
  }, []);

  const onOpenPlayList = (id) => {
    navigation(id);
  };

  return (
    <div className={styles.playLists}>
      <p className={styles.title}>Playlists</p>
      <ScrollViewGradient gateHeight={30}>
        <section className={styles.playListCards}>
          {
            playLists.map((item) => (
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
                    src={item.images[0]?.url}
                    alt="playlist"
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
      </ScrollViewGradient>
    </div>
  );
}

export default PlayListsPage;
