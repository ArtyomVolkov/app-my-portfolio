import React from 'react';

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';

import InputBase from '@mui/material/InputBase';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useSearchData } from '../../store/search';
import { useSearchActions } from '../../store/actions/search';

import styles from './style.module.scss';

const SearchBox = () => {
  const { search, searchType } = useSearchData();
  const { onChangeSearch, onChangeSearchType, onSearch } = useSearchActions();

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      return onSearch();
    }
  };

  const onChangeType = async (e, value) => {
    if (!value) {
      return;
    }
    onChangeSearchType(value);
    await onSearch();
  };

  return (
    <div className={styles.searchBox}>
      <Paper className={styles.searchPanel}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="what do you want to listen to?"
        />
        <Divider sx={{ height: 24, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: '5px' }} onClick={onSearch}>
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
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="artist">Artists</ToggleButton>
        <ToggleButton value="album">Albums</ToggleButton>
        <ToggleButton value="playlist">Playlists</ToggleButton>
        <ToggleButton value="track">Tracks</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
};

export default SearchBox;
