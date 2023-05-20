import React from 'react';
import { useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';

import InputBase from '@mui/material/InputBase';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { IStore } from '@pages/widgets/media-player/widget/store';
import { ESearchType } from '../../shared/enums/search';
import searchActions from '../../store/actions/search';

import styles from './style.module.scss';

const SearchBox = () => {
  const { search, searchType } = useSelector((store: IStore) => ({
    search: store.search.term,
    searchType: store.search.searchType,
  }));

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      return searchActions.onSearchAll(search);
    }
  };

  const onChangeType = async (e, value) => {
    if (!value) {
      return;
    }
    await searchActions.onChangeSearchType(value);
  };

  return (
    <div className={styles.searchBox}>
      <Paper className={styles.searchPanel}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          onChange={searchActions.onChangeSearchTerm}
          onKeyDown={onKeyDown}
          placeholder="what do you want to listen to?"
        />
        <Divider sx={{ height: 24, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: '5px' }} onClick={() => searchActions.onSearchAll()}>
          <SearchIcon className={styles.searchIcon} />
        </IconButton>
      </Paper>
      <ToggleButtonGroup
        value={searchType}
        exclusive
        size="small"
        onChange={onChangeType}
        className={styles.searchGroup}
      >
        <ToggleButton value={ESearchType.All}>All</ToggleButton>
        <ToggleButton value={ESearchType.Artists}>Artists</ToggleButton>
        <ToggleButton value={ESearchType.Albums}>Albums</ToggleButton>
        <ToggleButton value={ESearchType.Playlists}>Playlists</ToggleButton>
        <ToggleButton value={ESearchType.Tracks}>Tracks</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
};

export default SearchBox;
