import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import MemoryWidget from '@pages/widgets/memory/widget';

import { TECHNOLOGIES } from '@pages/widgets/memory/data';

import styles from './style.module.scss';

const Memory = () => {
  return (
    <Main className={styles.memoryWidgets}>
      <h3>Memory</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <p>Pretty simple heap size component for display measure of browser memory</p>
      <MemoryWidget />
    </Main>
  );
};

export default Memory;
