import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import MediaCard from '../../../components/cards/media';
import MediaBanner from '../../../components/cards/media-banner';
import Loader from '../../../components/loader';

import { useArtistActions } from '../../../store/actions/artist';
import { useArtistData } from '../../../store/artist';

import styles from './style.module.scss';

const Artist = () => {
  const params = useParams();
  const navigation = useNavigate();
  const { loading, artist, albums } = useArtistData();
  const { onFetchArtist } = useArtistActions();

  useEffect(() => {
    onFetchArtist(params.id).then();
  }, []);

  const backToArtists = () => {
    navigation(-1);
  };

  const onOpenArtistAlbumPage = (album) => {
    navigation(album.id);
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (!artist || !albums) {
      return null;
    }
    return (
      <>
        <MediaBanner image={artist.image} title={artist.name} className={styles.header}>
          <div className={styles.genres}>
            {
              artist.genres.map((item) => (
                <Chip
                  key={item}
                  className={styles.genre}
                  label={item.toUpperCase()}
                  size="small"
                />
              ))
            }
          </div>
          <div className={styles.details}>
            <div className={styles.albumsCount}>
              <PlaylistPlayRoundedIcon />
              <label>{ `${artist.totalAlbums} Albums` }</label>
            </div>
            <div className={styles.followers}>
              <PeopleAltRoundedIcon />
              <span>{ `${artist.followers} Followers` }</span>
            </div>
          </div>
        </MediaBanner>
        <div className={styles.body}>
          <p className={styles.title}>Albums</p>
          <section className={styles.albums}>
            {
              albums.map((item) => (
                <MediaCard
                  key={item.id}
                  image={item.image}
                  title={item.name}
                  subtitle={`${item.totalTracks} Tracks`}
                  onPress={() => onOpenArtistAlbumPage(item)}
                />
              ))
            }
          </section>
        </div>
      </>
    );
  }

  return (
    <div className={styles.artist}>
      <div className={styles.headline}>
        <IconButton className={styles.backButton} onClick={backToArtists}>
          <ChevronLeftRoundedIcon />
        </IconButton>
        <p className={styles.title}>Back to Artists</p>
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

export default Artist;
