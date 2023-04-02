import React from 'react';

import Header from '../../components/header';
import SearchBox from '../../components/search-box';
import SearchResult from './search-result';

import styles from './style.module.scss';

const Search = () => {
  return (
    <div className={styles.searchPage}>
      <Header title="Search" />
      <div className={styles.header}>
        <SearchBox />
      </div>
      <div className={styles.body}>
        <SearchResult />
      </div>
    </div>
  );
}

export default Search;
