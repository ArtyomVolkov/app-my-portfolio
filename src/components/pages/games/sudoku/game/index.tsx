import React, { useRef, useState } from 'react';

import GameArea from '@pages/games/sudoku/game/area';
import GamePanel, { ActionType } from '@pages/games/sudoku/game/panel';

import { GAME_DATA } from '@pages/games/sudoku/game/data';

import './style.scss';

export enum Level {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

const SudokuGameWidget = () => {
  const [level] = useState<Level>(Level.Easy);
  const gameAreaRef = useRef(null);

  const onAction = (action) => {
    switch (action) {
      case ActionType.ERASE: {
        gameAreaRef.current.fillItem(0);
        break;
      }
      case ActionType.HINT: {
        gameAreaRef.current.hintItem();
        break;
      }
      case ActionType.UNDO: {
        gameAreaRef.current.undoAction();
        break;
      }
      default:
        break;
    }
  };

  return (
    <section className="sudoku">
      <GamePanel onAction={onAction} />
      <GameArea
        componentRef={gameAreaRef}
        blank={GAME_DATA[level].blank}
        filled={GAME_DATA[level].filled}
      />
    </section>
  );
}

export default SudokuGameWidget;
