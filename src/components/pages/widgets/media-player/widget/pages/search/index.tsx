import React from 'react';

import SearchBox from '../../components/search-box';

import styles from './style.module.scss';

const Search = () => {
  return (
    <div className={styles.searchPage}>
      <div className={styles.header}>
        <SearchBox />
      </div>
      <div className={styles.body}>

      </div>
    </div>
  );
}

export default Search;
