import React from 'react';

import Main from '@components/main';
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
    <svg
      width="320px"
      height="200px"
      viewBox="0 0 100 100"
    >
      <path id="lineAE" d="M 0 100 l 20 -40" stroke="red" strokeWidth="2"/>
      {/*<path id="lineBC" d="M 250 50 l 150 300" stroke="red" strokeWidth="4"/>*/}
      {/*<path id="lineMID" d="M 175 200 l 150 0" stroke="green" strokeWidth="4"/>*/}
      {/*<path id="lineAC" d="M 100 350 s 150 -300 300 0" stroke="blue" strokeWidth="4" fill="none"/>*/}
    </svg>
  </Main>
);

export default InlineChartsPage;