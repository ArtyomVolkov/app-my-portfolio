import React from 'react';

import { mergeClassNames } from '@utils/common';

import styles from  './style.module.scss';

const Main = ({ children, className = null }) => (
  <main className={mergeClassNames([styles.mainContent, className])}>
    { children }
  </main>
);

export default Main;