import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import Header from '../../../components/header';
import Loader from '../../../components/loader';
import TrackList from '../../../components/track-list';
import Followers from '../../../components/labels/followers';
import MediaBanner from '../../../components/cards/media-banner';

import { mergeClassNames } from '@utils/common';
import { usePlayListActions } from '../../../store/actions/playlist';

import { usePlaylistData } from '../../../store/playlist';

import styles from './style.module.scss';

interface IPlayList {
  backButtonText?: string
}

const PlayList: React.FC<IPlayList> = ({ backButtonText }) => {
  const params = useParams();
  const { loading, playlist, tracks } = usePlaylistData();
  const { onFetchPlaylist, onSetPlayTrack } = usePlayListActions();

  useEffect(() => {
    onFetchPlaylist(params.id).then();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (!playlist) {
      return null;
    }
    return (
      <>
        <MediaBanner
          className={styles.header}
          title={playlist.name}
          image={playlist.image}
        >
          <div className={styles.owner}>
            { playlist.owner }
          </div>
          <div className={styles.details}>
            <div className={styles.tracksCount}>
              <PlaylistPlayRoundedIcon />
              <label>{ `${playlist.totalTracks} Tracks` }</label>
            </div>
            <div className={styles.followers}>
              <PeopleAltRoundedIcon />
              <Followers value={playlist.followers} />
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
        </MediaBanner>
        <div className={styles.tracks}>
          <p className={styles.title}>Tracks</p>
          <TrackList data={tracks} onSetPlayTrack={onSetPlayTrack} />
        </div>
      </>
    )
  };

  return (
   <div className={styles.playList}>
     <Header title={backButtonText || 'Back'} useHistory />
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