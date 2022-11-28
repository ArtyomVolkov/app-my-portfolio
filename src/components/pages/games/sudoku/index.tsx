import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import SudokuGameWidget from '@pages/games/sudoku/game';

import { TECHNOLOGIES } from '@pages/games/sudoku/game/data';

import './style.scss';

const SudokuPage = () => (
  <Main className="sudoku-page">
    <h3>Sudoku</h3>
    <TechnologyList data={TECHNOLOGIES} />
    <SudokuGameWidget />
  </Main>
);

export default SudokuPage;