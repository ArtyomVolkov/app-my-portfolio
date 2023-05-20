import React from 'react';
import { useSelector } from 'react-redux';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../components/loader';
import SearchPlaceholder from '../../components/placeholders/search';
import Artists from '../search/artists';
import Albums from '../search/albums';
import Playlists from '../search/playlists';
import Tracks from '../search/tracks';

import { IStore } from '../../store';
import { ESearchType } from '../../shared/enums/search';

import styles from './style.module.scss';

const SearchResult = () => {
  const search = useSelector((store: IStore) => store.search);

  const renderSections = () => {
    switch (search.searchType) {
      case ESearchType.All: {
        return (
          <div className={styles.sections}>
            <Artists />
            <Albums />
            <Playlists />
            <Tracks />
          </div>
        );
      }
      case ESearchType.Artists: {
        return (
          <Artists gridLayout />
        );
      }
      case ESearchType.Albums: {
        return (
          <Albums gridLayout />
        );
      }
      case ESearchType.Playlists: {
        return (
          <Playlists gridLayout />
        );
      }
      case ESearchType.Tracks: {
        return (
          <Tracks gridLayout />
        );
      }
      default:
        return null;
    }
  }

  const renderContent = () => {
    if (!search.loading && (!search.artists && !search.albums && !search.playlists && !search.tracks)) {
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
        search.loading && (
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

