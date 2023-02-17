import React from 'react';

import Breadcrumbs from '@shared/components/breadcrumbs';

import styles from './style.module.scss';

const Header = () => (
  <header className={styles.appHeader}>
    <Breadcrumbs />
  </header>
);

export default Header;