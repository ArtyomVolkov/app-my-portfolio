import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import Header from '../../../components/header';
import Loader from '../../../components/loader';
import MediaCard from '../../../components/cards/media';
import Followers from '../../../components/labels/followers';
import MediaBanner from '../../../components/cards/media-banner';

import { IAlbum, IArtist as ArtistData } from '../../..//shared/interfaces/music-store';

import styles from './style.module.scss';

interface IArtist {
  artist: {
    loading: boolean,
    data: ArtistData,
    albums: Array<IAlbum>
  },
  actions: {
    onFetchArtist: (id) => Promise<any>,
  },
  backButtonText?: string
}

const Artist: React.FC<IArtist> = ({ artist, actions, backButtonText }) => {
  const params = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    actions.onFetchArtist(params.id).then();
  }, []);

  const onOpenArtistAlbumPage = (album) => {
    navigation(album.id);
  };

  const renderContent = () => {
    if (artist.loading) {
      return <Loader />;
    }
    if (!artist.data || !artist.albums) {
      return null;
    }
    return (
      <>
        <MediaBanner image={artist.data.image} title={artist.data.name} className={styles.header}>
          <div className={styles.genres}>
            {
              artist.data.genres.map((item) => (
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
              <label>{ `${artist.data.totalAlbums} Albums` }</label>
            </div>
            <div className={styles.followers}>
              <PeopleAltRoundedIcon />
              <Followers value={artist.data.followers} />
            </div>
          </div>
        </MediaBanner>
        <div className={styles.body}>
          <p className={styles.title}>Albums</p>
          <section className={styles.albums}>
            {
              artist.albums.map((item) => (
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
      <Header title={ backButtonText || 'Back'} useHistory />
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
