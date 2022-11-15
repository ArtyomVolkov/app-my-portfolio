import React, { useState } from 'react';

import GameArea from '@pages/games/sudoku/game/area';
import GamePanel from '@pages/games/sudoku/game/panel';

import { GAME_DATA } from '@pages/games/sudoku/game/data';

import './style.scss';

export enum Level {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

const SudokuGameWidget = () => {
  const [level] = useState<Level>(Level.Easy);

  return (
    <section className="sudoku">
      <GamePanel />
      <GameArea
        blank={GAME_DATA[level].blank}
        data={GAME_DATA[level].filled}
      />
    </section>
  );
}

export default SudokuGameWidget;
