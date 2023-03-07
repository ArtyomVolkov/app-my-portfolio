import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';

import Loader from '../../../components/loader';
import TrackList from '../../../components/track-list';

import { usePlayListsActions } from '../../../store/actions/playlists';

import styles from './style.module.scss';
import ScrollViewGradient from '@shared/components/scroll-view';

const PlayList = () => {
  const [loading, setLoading] = useState(true);
  const [playList, setPlayList] = useState(null);
  const [tracks, setTracks] = useState([]);
  const params = useParams();
  const navigation = useNavigate();
  const { onFetchPlayList } = usePlayListsActions();

  useEffect(() => {
    onFetchPlayList(params.id).then((data) => {
      setPlayList(data);
      setTracks(data.tracks.items.map((item) => item.track));
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const backToPlayLists = () => {
    navigation(-1);
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    return (
      <>
        <div className={styles.header}>
          <img src={playList.images[0].url} className={styles.image} alt="Playlist" />
          <div className={styles.captions}>
            <div className={styles.name}>
              <span>
                 { playList.name }
              </span>
            </div>
            <div className={styles.owner}>
              { playList.owner.display_name }
            </div>
            <div className={styles.details}>
              <div className={styles.tracksCount}>
                <PlaylistPlayRoundedIcon />
                <label>{ `${playList.tracks.total} Tracks` }</label>
              </div>
              <div className={styles.followers}>
                <PeopleAltRoundedIcon />
                <span>{ `${playList.followers.total} Followers` }</span>
              </div>
              <div className={styles.availability}>
                <PublicRoundedIcon />
                <Chip label={playList.public ? 'Public' : 'Private'} size="small" />
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