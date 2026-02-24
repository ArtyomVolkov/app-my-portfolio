import React from 'react';

import Main from '@app/layout/main';
import TechnologyList from '@shared/components/lists/technologies';
import Game2048 from '@pages/games/2048/game';

import { TECHNOLOGIES } from '@pages/games/2048/game/data';

import styles from './style.module.scss';

const SudokuPage = () => (
  <Main className={styles.game2048Page}>
    <h3>2048</h3>
    <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
    <Game2048 />
  </Main>
);

export default SudokuPage;
