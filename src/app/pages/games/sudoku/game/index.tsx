import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import GameArea from '@pages/games/sudoku/game/area';
import GamePanel from '@pages/games/sudoku/game/panel';
import Modal from '@pages/games/sudoku/game/modal';

import SudokuStore, { type RowData } from '@pages/games/sudoku/game/store';
import { Level } from '@pages/games/sudoku/game/generator';

import styles from './style.module.scss';

export const Action = {
  FILL: 'FILL',
  ERASE: 'ERASE',
  UNDO: 'UNDO',
  HINT: 'HINT',
  SET_ACTIVE: 'SET_ACTIVE',
  CHANGE_LEVEL: 'CHANGE_LEVEL',
  NEW_GAME: 'NEW_GAME',
  CLOSE_MODAL: 'CLOSE_MODAL',
};

export type TAction = (typeof Action)[keyof typeof Action];

const SudokuGameWidget = () => {
  const store = useRef(new SudokuStore(Level.Easy)).current;

  useEffect(() => {
    store.setNewGame(Level.Easy);
  }, []);

  const onAction = (action: TAction, data: RowData | Level | null = null) => {
    switch (action) {
      case Action.SET_ACTIVE: {
        return store.setActive(data as RowData);
      }
      case Action.FILL: {
        return store.fill(data as number);
      }
      case Action.ERASE: {
        return store.fill(0);
      }
      case Action.HINT: {
        return store.hint();
      }
      case Action.UNDO: {
        return store.undo();
      }
      case Action.CHANGE_LEVEL: {
        return store.onChangeLevel(data as Level);
      }
      case Action.NEW_GAME: {
        return store.onStartNewGame();
      }
      case Action.CLOSE_MODAL: {
        return store.onCloseModal();
      }
      default:
        break;
    }
  };

  return (
    <section className={styles.sudokuWidget}>
      <Modal data={store.modal} onAction={onAction} />
      <GamePanel
        level={store.level}
        hints={store.hints}
        activeValue={store.matrix?.data?.[store.active[0]]?.[store.active[1]]}
        history={store.history}
        onAction={onAction}
      />
      <GameArea
        active={store.active}
        blank={store.matrix.data}
        origin={store.matrix.blank}
        filled={store.matrix.filled}
        onAction={onAction}
      />
    </section>
  );
};

export default observer(SudokuGameWidget);
