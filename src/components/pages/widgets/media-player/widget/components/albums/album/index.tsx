import React, { useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../../components/loader';
import Header from '../../../components/header';
import TrackList from '../../../components/track-list';
import MediaBanner from '../../../components/cards/media-banner';

import { ITrack, IAlbum } from '../../../shared/interfaces/music-store';

import styles from './style.module.scss';

interface IArtistAlbum {
  loading: boolean,
  album: IAlbum,
  tracks: Array<ITrack>
  actions: {
    onFetchAlbum: (albumId) => Promise<any>,
    onSetPlayTrack: (uri) => void,
  }
  backButtonText?: string,
}

const ArtistAlbum: React.FC<IArtistAlbum> = ({ backButtonText, actions, loading, album, tracks }) => {
  const params = useParams<{ albumId: string }>();

  useEffect(() => {
    actions.onFetchAlbum(params.albumId).then();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (!album || !tracks) {
      return null;
    }

    return (
      <>
        <MediaBanner image={album.image} title={album.name} className={styles.header}>
          <label className={styles.label}>{ album.label }</label>
          <div className={styles.details}>
            <div className={styles.tracksCount}>
              <PlaylistPlayRoundedIcon />
              <label>{ `${album.totalTracks} Tracks` }</label>
            </div>
            <div className={styles.releaseDate}>
              <InsertInvitationRoundedIcon />
              <span>{ moment(album.releaseDate).format('LL') }</span>
            </div>
          </div>
        </MediaBanner>
        <div className={styles.tracks}>
          <p className={styles.title}>Tracks</p>
          <TrackList
            data={tracks}
            trackNamePriority="track"
            onSetPlayTrack={actions.onSetPlayTrack}
          />
        </div>
      </>
    )
  }

  return (
    <div className={styles.album}>
      <Header
        title={backButtonText || 'Back'}
        useHistory
      />
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

export default ArtistAlbum;