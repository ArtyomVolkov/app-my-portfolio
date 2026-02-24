import React, { useEffect, useState, useMemo, useRef } from 'react';
import Button from '@shared/components/ui-kit/button';

import {
  saveGameData,
  loadGameData,
  mergeRow,
  mergeCell,
  horizontalSwap,
  verticalSwap,
  isGameOver,
  getCellIndex,
  getScore,
  setAnimation,
} from './actions';

import { type Grid, MergeDirection } from './types';
import { GAME_DATA, CELLS } from './data';

import styles from './style.module.scss';

const Game2048 = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [grid, setGrid] = useState<Grid>(GAME_DATA);
  const [gameOver, setGameOver] = useState(false);
  const [oldData, setOldData] = useState<Grid | null>(null);

  useEffect(() => {
    setInitialData();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [grid]);

  const score = useMemo(() => getScore(grid), [grid]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (gameOver) {
      return;
    }
    switch (e.key) {
      case 'ArrowRight': {
        shiftToRight();
        break;
      }
      case 'ArrowLeft': {
        shiftToLeft();
        break;
      }
      case 'ArrowUp': {
        shiftToTop();
        break;
      }
      case 'ArrowDown': {
        shiftToDown();
        break;
      }
      default: {
        break;
      }
    }
  };

  const updateGridData = (data: Grid) => {
    setOldData(grid);
    setGrid(data);
    saveGameData(data);
  };

  const setInitialData = () => {
    const savedData = loadGameData();

    if (savedData) {
      setGrid(savedData);
      checkIsGameOver(savedData);
      return;
    }
    const newData = [...grid];
    let [first, second] = [getCellIndex(newData), getCellIndex(newData)];

    while (first === second) {
      first = getCellIndex(newData);
    }

    newData[first] = 2;
    newData[second] = 2;
    setGrid(newData);
    setAppearAnimation(first);
    setAppearAnimation(second);
  };

  const generateValue = (data: Grid) => {
    const cellIndex = getCellIndex(data);
    const hasChange = data.some((_, index) => grid[index] !== data[index]);

    if (!hasChange || cellIndex < 0) {
      return;
    }
    data[cellIndex] = 2;
    checkIsGameOver(data);
    setAppearAnimation(cellIndex);
  };

  const setAppearAnimation = (cellIndex: number) => {
    setAnimation(
      gridRef as React.RefObject<HTMLDivElement>,
      cellIndex,
      styles.appearAnimation
    );
  };

  const setMergeAnimation = (indexes: Array<number>) => {
    indexes.forEach((item) => {
      setAnimation(
        gridRef as React.RefObject<HTMLDivElement>,
        item,
        styles.mergeAnimation
      );
    });
  };

  const checkIsGameOver = (data: Grid) => {
    let isOver = isGameOver(data);

    if (isOver !== gameOver) {
      setGameOver(isOver);
    }
  };

  const shiftToRight = () => {
    const data = [...grid];
    let merged;

    horizontalSwap(data, MergeDirection.RIGHT);
    merged = mergeRow(data, MergeDirection.RIGHT);
    horizontalSwap(data, MergeDirection.RIGHT);
    generateValue(data);
    updateGridData(data);
    setMergeAnimation(merged);
  };

  const shiftToLeft = () => {
    const data = [...grid];
    let merged;

    horizontalSwap(data, MergeDirection.LEFT);
    merged = mergeRow(data, MergeDirection.LEFT);
    horizontalSwap(data, MergeDirection.LEFT);
    generateValue(data);
    updateGridData(data);
    setMergeAnimation(merged);
  };

  const shiftToTop = () => {
    const data = [...grid];
    let merged;

    verticalSwap(data, MergeDirection.TOP);
    merged = mergeCell(data, MergeDirection.TOP);
    verticalSwap(data, MergeDirection.TOP);
    generateValue(data);
    updateGridData(data);
    setMergeAnimation(merged);
  };

  const shiftToDown = () => {
    const data = [...grid];
    let merged;

    verticalSwap(data, MergeDirection.BOTTOM);
    merged = mergeCell(data, MergeDirection.BOTTOM);
    verticalSwap(data, MergeDirection.BOTTOM);
    generateValue(data);
    updateGridData(data);
    setMergeAnimation(merged);
  };

  const onUndo = () => {
    if (!oldData) {
      return;
    }
    setGrid([...oldData]);
    checkIsGameOver(oldData);
    setOldData(null);
  };

  const handleNewGame = () => {
    const newData = [...GAME_DATA];
    let [first, second] = [getCellIndex(newData), getCellIndex(newData)];

    if (first === -1 || second === -1) {
      return;
    }

    while (first === second) {
      first = getCellIndex(newData);
    }

    newData[first] = 2;
    newData[second] = 2;
    setGrid(newData);
    setGameOver(false);
    setAppearAnimation(first);
    setAppearAnimation(second);
  };

  return (
    <div className={styles.game2048Widget}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Join the numbers and get to the 2048 tile!
        </h3>
        <div className={styles.panel}>
          <div className={styles.actions}>
            <Button
              onClick={onUndo}
              color="primary"
              variant="outlined"
              className={styles.button}
              disabled={!oldData}
            >
              Undo
            </Button>
            <Button
              onClick={handleNewGame}
              variant="solid"
              color="primary"
              className={styles.button}
            >
              New Game
            </Button>
          </div>
          <p className={styles.score}>
            <span className={styles.name}>SCORE</span>
            <span className={styles.value}>{score}</span>
          </p>
        </div>
      </div>
      <div
        ref={gridRef}
        className={styles.grid}
        style={{
          borderColor: 'black',
          gridTemplateColumns: `repeat(${CELLS}, 80px)`,
        }}
      >
        {grid.map((item, index) => (
          <div key={index} className={styles.tile} data-value={item}>
            {item > 0 && <span className={styles.cellValue}>{item}</span>}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <p className={styles.title}>Game Over!</p>
            <div className={styles.actions}>
              <button
                className={styles.button}
                onClick={onUndo}
                disabled={!oldData}
              >
                Undo
              </button>
              <button className={styles.button} onClick={handleNewGame}>
                New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game2048;
