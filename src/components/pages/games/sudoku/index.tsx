import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import SudokuGameWidget from '@pages/games/sudoku/game';

import { SUDOKU } from '@pages/games/puzzle/data';

import './style.scss';

const SudokuPage = () => (
  <Main className="sudoku-page">
    <h3>Sudoku</h3>
    <TechnologyList data={SUDOKU.technologies} />
    <SudokuGameWidget />
  </Main>
);

export default SudokuPage;