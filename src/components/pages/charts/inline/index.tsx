import React from 'react';

import Main from '@components/main';
import InlineChart from '@pages/charts/inline/chart';
import TechnologyList from '@shared/components/lists/technologies';

import { TECHNOLOGIES } from './data';

import styles from './style.module.scss';

const InlineChartsPage = () => (
  <Main className={styles.inlineCharts}>
    <h3>Inline Chart</h3>
    <TechnologyList
      data={TECHNOLOGIES}
      className={styles.technologyList}
    />
    <InlineChart />
  </Main>
);

export default InlineChartsPage;