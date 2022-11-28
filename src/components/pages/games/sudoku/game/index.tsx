import React, { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import GameArea from '@pages/games/sudoku/game/area';
import GamePanel from '@pages/games/sudoku/game/panel';
import Modal, { ModalType } from '@pages/games/sudoku/game/modal';

import SudokuGenerator, { Level } from '@pages/games/sudoku/game/generator';

import './style.scss';

export enum Action {
  FILL,
  ERASE,
  UNDO,
  HINT,
  SET_ACTIVE,
  CHANGE_LEVEL,
  NEW_GAME,
  CLOSE_MODAL
}

const SudokuGameWidget = () => {
  useEffect(() => {
    setNewGame(Level.Easy);
  }, []);

  const [generator] = useState(new SudokuGenerator());
  const [level, setLevel] = useState<Level>(Level.Easy);
  const [hasChange, setHasChange] = useState<boolean>(false);
  const [blank, setBlank] = useState([]);
  const [filled, setFilled] = useState([]);
  const [blankData, setBlankData] = useState([]);
  const [active, setActive] = useState<[block: number, cell: number]>([-1, -1]);
  const [hints, setHints] = useState<number>(0);
  const [history, setHistory] = useState<Array<{ block: number, cell: number, value: number }>>([]);
  const [modal, setModal] = useState<{ open: boolean, type: ModalType, onConfirm?: () => void}>({
    open: false, type: null
  });

  const onAction = (action, data = null) => {
    switch (action) {
      case Action.SET_ACTIVE: {
        return setActive(data);
      }
      case Action.FILL: {
        return fill(data);
      }
      case Action.ERASE: {
        return fill(0);
      }
      case Action.HINT: {
        return hint();
      }
      case Action.UNDO: {
        return undo();
      }
      case Action.CHANGE_LEVEL: {
        return changeLevel(data);
      }
      case Action.NEW_GAME: {
        return newGame();
      }
      case Action.CLOSE_MODAL: {
        return closeModal();
      }
      default:
        break;
    }
  };

  const changeLevel = (level: Level) => {
    if (!hasChange) {
      setNewGame(level);
      return;
    }
    setModal({
      open: true,
      type: ModalType.CONFIRM,
      onConfirm: () => setNewGame(level),
    });
  };

  const newGame = () => {
    if (!hasChange) {
      setNewGame(level);
      return;
    }
    setModal({
      open: true,
      type: ModalType.CONFIRM,
      onConfirm: () => setNewGame(level),
    });
  };

  const setNewGame = (level) => {
    const sudoku = generator.generate(level);

    setHasChange(false);
    setLevel(level);
    setBlank(sudoku.blank);
    setBlankData(cloneDeep(sudoku.blank));
    setFilled(sudoku.filled);
    setHistory([]);
    setHints(5);
    setActive([-1, -1]);
  };

  const closeModal = () => {
    setModal({ open: false, type: null });
  };

  const fill = (value = 0) => {
    const [block, cell] = active;

    if (block < 0 || cell < 0) {
      return;
    }
    const newData = [...blankData];

    if (!hasChange) {
      setHasChange(true);
    }
    newData[block][cell] = value;
    setBlankData(newData);
    setHistory([...history, { block, cell, value }]);
    checkIsFinish(newData);
  };

  const hint = () => {
    if (hints <= 0) {
      return;
    }
    const data = SudokuGenerator.setHint(blankData, filled);

    if (!data) {
      return;
    }

    if (!hasChange) {
      setHasChange(true);
    }
    setHints(hints-1);
    setBlankData(data);
    checkIsFinish(data);
  }

  const undo = () => {
    if (!history.length) {
      return;
    }

    const newHistory = [...history];
    const newData = [...blankData];
    const lastItem = newHistory[newHistory.length-1];
    const previousItem = newHistory[newHistory.length-2];

    newData[lastItem.block][lastItem.cell] = 0;

    if (newHistory.length > 1) {
      newData[previousItem.block][previousItem.cell] = previousItem.value;
    }

    newHistory.pop();
    setBlankData(newData);
    setHistory(newHistory);
  };

  const checkIsFinish = (data) => {
    if (!SudokuGenerator.isFinish(data, filled)) {
     return;
    }
    setModal({
      open: true,
      type: ModalType.FINISH,
      onConfirm: () => setNewGame(level),
    });
  };

  return (
    <section className="sudoku-widget">
      <Modal
        data={modal}
        onAction={onAction}
      />
      <GamePanel
        level={level}
        hints={hints}
        activeValue={blankData?.[active[0]]?.[active[1]]}
        history={history}
        onAction={onAction}
      />
      <GameArea
        active={active}
        blank={blankData}
        origin={blank}
        filled={filled}
        onAction={onAction}
      />
    </section>
  );
}

export default SudokuGameWidget;
