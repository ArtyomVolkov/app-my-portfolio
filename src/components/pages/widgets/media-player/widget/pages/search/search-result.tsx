import React from 'react';
import { shallow } from 'zustand/shallow'

import CircularProgress from '@mui/material/CircularProgress';
import ScrollViewGradient from '@shared/components/scroll-view';
import SearchPlaceholder from '../../components/placeholders/search';
import Artists from '../search/artists';
import Albums from '../search/albums';
import Playlists from '../search/playlists';

import { useSearchData } from '../../store/search';

import styles from './style.module.scss';

const SearchResult = () => {
  const { loading, searchType, artists, albums, playlists, tracks } = useSearchData(
    (state) => ({
      loading: state.loading,
      searchType: state.searchType,
      artists: state.artists,
      albums: state.albums,
      playlists: state.playlists,
      tracks: state.tracks
    }),
    shallow,
  );

  const renderSections = () => {
    switch (searchType) {
      case 'all': {
        return (
          <div className={styles.sections}>
            <Artists />
            <Albums />
            <Playlists />
          </div>
        );
      }
      case 'artist': {
        return (
          <Artists gridLayout />
        );
      }
      case 'album': {
        return (
          <Albums gridLayout />
        );
      }
      case 'playlist': {
        return (
          <Playlists gridLayout />
        );
      }
      case 'track': {
        return (
          <p>Tracks</p>
        );
      }
      default:
        return null
    }
  }

  const renderContent = () => {
    if (!loading && (!artists && !albums && !playlists && !tracks)) {
      return <SearchPlaceholder />;
    }
    return (
      <ScrollViewGradient gateHeight={30}>
        { renderSections() }
      </ScrollViewGradient>
    );
  };

  return (
    <div className={styles.searchResult}>
      {
        loading && (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        )
      }
      {
        renderContent()
      }
    </div>
  );
};

export default SearchResult;

