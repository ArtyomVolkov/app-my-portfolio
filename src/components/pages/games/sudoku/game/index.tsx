import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import GameArea from '@pages/games/sudoku/game/area';
import GamePanel from '@pages/games/sudoku/game/panel';
import Modal, { ModalType } from '@pages/games/sudoku/game/modal';

import SudokuGenerator from '@pages/games/sudoku/game/generator';

import { GAME_DATA } from '@pages/games/sudoku/game/data';

import './style.scss';

export enum Level {
  Easy = 62,
  Medium = 53,
  Hard = 44
}

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

const generator = new SudokuGenerator();

const SudokuGameWidget = () => {
  const [level, setLevel] = useState<Level>(Level.Easy);
  const [hasChange, setHasChange] = useState<boolean>(false);
  const [blank, setBlank] = useState(GAME_DATA[level].blank);
  const [filled, setFilled] = useState(GAME_DATA[level].filled);
  const [blankData, setBlankData] = useState(cloneDeep(GAME_DATA[level].blank));
  const [active, setActive] = useState<[block: number, cell: number]>([-1, -1]);
  const [hints, setHints] = useState<number>(5);
  const [history, setHistory] = useState<Array<{ block: number, cell: number, value: number }>>([]);
  const [modal, setModal] = useState<{ open: boolean, type: ModalType, onConfirm?: () => void}>({
    open: false, type: null
  });

  generator.generate(level);

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
    setHasChange(false);
    setLevel(level);
    setBlank(GAME_DATA[level].blank);
    setBlankData(cloneDeep(GAME_DATA[level].blank));
    setFilled(GAME_DATA[level].filled);
    setHistory([]);
    setHints(5);
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

    const blocks = [];
    const emptyBlocs = [];
    const newData = [...blankData];

    blankData.forEach((row, index) => {
      const hasEmpty = row.some((item) => !item);

      if (!hasEmpty) {
        blocks[index] = null;
        return;
      }
      emptyBlocs.push(index);
      blocks[index] = row.reduce((prev, item, index) => {
        if (!item) {
          prev.push(index);
        }
        return prev;
      }, []);
    });

    if (!emptyBlocs.length) {
      return;
    }

    if (!hasChange) {
      setHasChange(true);
    }

    const blockIndex = emptyBlocs[Math.round(Math.random() * (emptyBlocs.length-1))];
    const cellIndex = blocks[blockIndex][Math.round(Math.random() * (blocks[blockIndex].length-1))];

    newData[blockIndex][cellIndex] = filled[blockIndex][cellIndex];
    setHints(hints-1);
    setBlankData(newData);
    checkIsFinish(newData);
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
    const isFinish = !data.some((itemRow, row) => itemRow.some((item, cell) => filled[row][cell] !== item));

    if (isFinish) {
      setModal({
        open: true,
        type: ModalType.FINISH
      });
    }
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
