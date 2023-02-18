import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import SudokuGameWidget from '@pages/games/sudoku/game';

import { TECHNOLOGIES } from '@pages/games/sudoku/game/data';

import styles from './style.module.scss';

const SudokuPage = () => (
  <Main className={styles.sudokuPage}>
    <h3>Sudoku</h3>
    <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
    <SudokuGameWidget />
  </Main>
);

export default SudokuPage;