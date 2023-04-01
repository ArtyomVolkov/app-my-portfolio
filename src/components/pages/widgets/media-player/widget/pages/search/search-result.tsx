import React from 'react';
import { shallow } from 'zustand/shallow'

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../components/loader';
import SearchPlaceholder from '../../components/placeholders/search';
import Artists from '../search/artists';
import Albums from '../search/albums';
import Playlists from '../search/playlists';
import Tracks from '../search/tracks';

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
            <Tracks />
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
          <Tracks gridLayout />
        );
      }
      default:
        return null;
    }
  }

  const renderContent = () => {
    if (!loading && (!artists && !albums && !playlists && !tracks)) {
      return <SearchPlaceholder />;
    }
    return (
      <ScrollViewGradient gateHeight={30} resetScrollPosition>
        { renderSections() }
      </ScrollViewGradient>
    );
  };

  return (
    <div className={styles.searchResult}>
      {
        loading && (
          <Loader className={styles.loader} />
        )
      }
      {
        renderContent()
      }
    </div>
  );
};

export default SearchResult;

