import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../../components/loader';
import TrackList from '../../../components/track-list';

import { mergeClassNames } from '@utils/common';
import { usePlayListActions } from '../../../store/actions/playlist';
import { usePlaylistData } from '../../../store/playlist';

import styles from './style.module.scss';

const PlayList = () => {
  const params = useParams();
  const navigation = useNavigate();
  const { loading, playlist, tracks } = usePlaylistData();
  const { onFetchPlaylist } = usePlayListActions();

  useEffect(() => {
    onFetchPlaylist(params.id).then();
  }, []);

  const backToPlayLists = () => {
    navigation(-1);
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (!playlist) {
      return null;
    }
    return (
      <>
        <div className={styles.header}>
          <img src={playlist.images[0].url} className={styles.image} alt="Playlist" />
          <div className={styles.captions}>
            <div className={styles.name}>
              <span>
                 { playlist.name }
              </span>
            </div>
            <div className={styles.owner}>
              { playlist.owner.display_name }
            </div>
            <div className={styles.details}>
              <div className={styles.tracksCount}>
                <PlaylistPlayRoundedIcon />
                <label>{ `${playlist.tracks.total} Tracks` }</label>
              </div>
              <div className={styles.followers}>
                <PeopleAltRoundedIcon />
                <span>{ `${playlist.followers.total} Followers` }</span>
              </div>
              <div className={styles.availability}>
                <PublicRoundedIcon />
                <Chip
                  className={mergeClassNames([playlist.public ? styles.public : styles.private ])}
                  label={playlist.public ? 'Public' : 'Private'}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tracks}>
          <p className={styles.title}>Tracks</p>
          <TrackList data={tracks} />
        </div>
      </>
    )
  };

  return (
   <div className={styles.playList}>
     <div className={styles.headline}>
       <IconButton className={styles.backButton} onClick={backToPlayLists}>
         <ChevronLeftRoundedIcon />
       </IconButton>
       <p className={styles.title}>Playlist</p>
     </div>
     <div className={styles.body}>
       <ScrollViewGradient gateHeight={30}>
         {
           renderContent()
         }
       </ScrollViewGradient>
     </div>
   </div>
  );
}

export default PlayList;