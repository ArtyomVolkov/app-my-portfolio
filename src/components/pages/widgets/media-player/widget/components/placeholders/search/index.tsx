import React from 'react';

import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';

import styles from './style.module.scss';

const SearchPlaceholder = () => {
  return (
    <div className={styles.searchPlaceholder}>
      <ManageSearchRoundedIcon className={styles.icon} />
      <label className={styles.description}>
        <span>Search music content by: </span>
        <b> artists</b>,
        <b> albums</b>,
        <b> playlists</b>,
        <b> tracks</b>
      </label>
    </div>
  );
}

export default SearchPlaceholder;
