import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import ClockWidget from '@pages/widgets/clock/clockWidget';

import { TECHNOLOGIES } from '@pages/widgets/clock/data';

import styles from './style.module.scss';

const Clock = () => {
  return (
    <Main className={styles.clockWidgets}>
      <h3>Clock</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <ClockWidget />
    </Main>
  );
};

export default Clock;
