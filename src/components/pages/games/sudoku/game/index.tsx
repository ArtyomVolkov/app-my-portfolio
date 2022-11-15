import React from 'react';

import GameArea from '@pages/games/sudoku/game/area';
import GamePanel from '@pages/games/sudoku/game/panel';

import './style.scss';

const SudokuGameWidget = () => {
  return (
    <section className="sudoku">
      <GamePanel />
      <GameArea />
    </section>
  );
}

export default SudokuGameWidget;
