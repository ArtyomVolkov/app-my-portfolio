import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import GameWidget from '@pages/games/nonogram/game';

import { TECHNOLOGIES } from '@pages/games/nonogram/game/data';

import styles from './style.module.scss';

const JapaneseCrosswordsPage = () => (
  <Main className={styles.nonogram}>
    <h3>Nonogram</h3>
    <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
    <GameWidget />
  </Main>
);

export default JapaneseCrosswordsPage;