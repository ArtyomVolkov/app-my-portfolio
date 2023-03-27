import React from 'react';

import SearchBox from '../../components/search-box';
import SearchPlaceholder from '../../components/placeholders/search';

import styles from './style.module.scss';

const Search = () => {
  return (
    <div className={styles.searchPage}>
      <p className={styles.title}>Search</p>
      <div className={styles.header}>
        <SearchBox />
      </div>
      <div className={styles.body}>
        <SearchPlaceholder />
      </div>
    </div>
  );
}

export default Search;
