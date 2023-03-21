import React, { useEffect } from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../../../components/loader';
import TrackList from '../../../../components/track-list';
import MediaBanner from '../../../../components/cards/media-banner';

import { useArtistAlbum } from '../../../../store/artist-album';
import { useArtistAlbumActions } from '../../../../store/actions/artist-album';

import styles from './style.module.scss';

const ArtistAlbum = () => {
  const params = useParams<{ artistId: string, albumId: string }>();
  const navigation = useNavigate();
  const { onFetchData, onSetPlayTrack } = useArtistAlbumActions();
  const { loading, album, tracks } = useArtistAlbum();

  useEffect(() => {
    onFetchData(params.albumId).then();
  }, []);

  const backToArtistsAlbums = () => {
    navigation(-1);
  };

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
            onSetPlayTrack={onSetPlayTrack}
          />
        </div>
      </>
    );
  };

  return (
    <div className={styles.artistAlbum}>
      <div className={styles.headline}>
        <IconButton className={styles.backButton} onClick={backToArtistsAlbums}>
          <ChevronLeftRoundedIcon />
        </IconButton>
        <p className={styles.title}>Back to Artist's Albums</p>
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

export default ArtistAlbum;
