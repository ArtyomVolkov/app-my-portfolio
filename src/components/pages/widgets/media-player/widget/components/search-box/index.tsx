import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';

import InputBase from '@mui/material/InputBase';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import styles from './style.module.scss';

const SearchBox = () => {
  const [searchBy, setSearchBy] = useState('all');

  const onChangeSearchBy = (e, value) => {
    setSearchBy(value);
  };

  return (
    <div className={styles.searchBox}>
      <Paper className={styles.searchPanel}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
        />
        <Divider sx={{ height: 24, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: '5px' }}>
          <SearchIcon className={styles.searchIcon} />
        </IconButton>
      </Paper>
      <ToggleButtonGroup
        value={searchBy}
        exclusive
        size="small"
        onChange={onChangeSearchBy}
        className={styles.searchGroup}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="genres">Genres</ToggleButton>
        <ToggleButton value="artists">Artists</ToggleButton>
        <ToggleButton value="albums">Albums</ToggleButton>
        <ToggleButton value="playlists">Playlists</ToggleButton>
        <ToggleButton value="tracks">Tracks</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
};

export default SearchBox;
