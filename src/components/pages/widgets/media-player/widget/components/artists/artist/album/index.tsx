import React, { useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../../../components/loader';
import Header from '../../../../components/header';
import TrackList from '../../../../components/track-list';
import MediaBanner from '../../../../components/cards/media-banner';

import { ITrack, IAlbum } from '../../../../shared/interfaces/music-store';

import styles from './style.module.scss';

interface IArtistAlbum {
  backButtonText?: string,
  album: {
    loading: boolean,
    data: IAlbum,
    tracks: Array<ITrack>
  }
  actions: {
    onSetPlayTrack: (uri: string) => void,
    onFetchArtistAlbum: (albumId: string) => Promise<any>,
  }
}

const ArtistAlbum: React.FC<IArtistAlbum> = ({ album, actions, backButtonText }) => {
  const params = useParams<{ artistId: string, albumId: string }>();

  useEffect(() => {
    actions.onFetchArtistAlbum(params.albumId).then();
  }, []);

  const renderContent = () => {
    if (album.loading) {
      return <Loader />;
    }
    if (!album.data || !album.tracks) {
      return null;
    }
    return (
      <>
        <MediaBanner image={album.data.image} title={album.data.name} className={styles.header}>
          <label className={styles.label}>{ album.data.label }</label>
          <div className={styles.details}>
            <div className={styles.tracksCount}>
              <PlaylistPlayRoundedIcon />
              <label>{ `${album.data.totalTracks} Tracks` }</label>
            </div>
            <div className={styles.releaseDate}>
              <InsertInvitationRoundedIcon />
              <span>{ moment(album.data.releaseDate).format('LL') }</span>
            </div>
          </div>
        </MediaBanner>
        <div className={styles.tracks}>
          <p className={styles.title}>Tracks</p>
          <TrackList
            data={album.tracks}
            trackNamePriority="track"
            onSetPlayTrack={actions.onSetPlayTrack}
          />
        </div>
      </>
    );
  };

  return (
    <div className={styles.artistAlbum}>
      <Header title={backButtonText || `Back to Artist's Albums`} useHistory />
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
