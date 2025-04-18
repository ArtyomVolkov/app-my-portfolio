import React, { useEffect, useState } from 'react';

import PuzzleArea from './area';
import Toolbar from './toolbar';
import Controls from './toolbar/controls';

import styles from './style.module.scss';

const generateItems = (size) => {
  const length = Math.pow(size, 2)-1;
  const crypt = {};
  const pattern = Array(length)
    .fill(0)
    .map((item, index) => index+1)
    .sort((a, b) => a%size > b%size ? 1 : -1);

  pattern.push(0);

  const list = Array(length).fill(1).map((item, index) => index+1);

  Array(length).fill(1).forEach((item, index) => {
    const randomIndex = Math.round(Math.random()*(list.length-1));
    crypt[index+1] = list[randomIndex];
    list.splice(randomIndex, 1);
  });

  return pattern.map((item) => crypt[item]);
}

export enum Level {
  EASY = 3,
  MEDIUM = 5,
  HARD = 7,
}

export enum KeyCodes {
  UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39
}

interface PuzzleTags {
  defaultLevel?: Level,
  cellSize?: number,
}

const PuzzleTags: React.FC<PuzzleTags> = ({ defaultLevel = Level.EASY, cellSize = 40 }) => {
  const [isOver, setIsOver] = useState(false);
  const [level, setActive] = useState(defaultLevel);
  const [items, setItems] = useState(() => generateItems(defaultLevel));
  const [zeroIndex, setZeroIndex] = useState(() => Math.pow(defaultLevel, 2)-1);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [zeroIndex, items]);

  const onChangeItemsCount = (value) => {
    setActive(value);
    setZeroIndex(Math.pow(value, 2)-1);
    setItems(generateItems(value));
  };

  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case KeyCodes.UP: {
        moveUp();
        break;
      }
      case KeyCodes.DOWN: {
        moveDown();
        break;
      }
      case KeyCodes.LEFT: {
        moveLeft();
        break;
      }
      case KeyCodes.RIGHT: {
        moveRight();
        break;
      }
      default:
        return false;
    }
  };

  const onCheckIsFinish = (data) => {
    const isDone = !data.some((item, index) => {
      if (!item && (index === items.length - 1)) {
        return false;
      }
      return index !== (item-1);
    });
    if (isDone) {
      setIsOver(true);
    }
  };

  const onRefresh = () => {
    setIsOver(false);
    setItems(generateItems(level));
    setZeroIndex(Math.pow(level, 2)-1);
  };

  const horizontalMove = (index) => {
    const newItems = [...items];

    newItems[zeroIndex] = items[zeroIndex+index];
    newItems[zeroIndex+index] = items[zeroIndex];

    setItems(newItems);
    onCheckIsFinish(newItems);
    setZeroIndex(zeroIndex+index);
  };

  const verticalMove = (index) => {
    const newItems = [...items];

    newItems[zeroIndex+index] = items[zeroIndex];
    newItems[zeroIndex] = items[zeroIndex+index];

    setItems(newItems);
    setZeroIndex(zeroIndex+index);
    onCheckIsFinish(newItems);
  };

  const moveLeft = () => {
    if ((zeroIndex % level) >= level-1) {
      return;
    }
    horizontalMove(1);
  };

  const moveRight = () => {
    if (!(zeroIndex % level)) {
      return;
    }
    horizontalMove(-1);
  };

  const moveUp = () => {
    if (!items[zeroIndex+level]) {
      return;
    }
    verticalMove(+level);
  };

  const moveDown = () => {
    if (!items[zeroIndex-level]) {
      return;
    }
    verticalMove(-level);
  };

  return (
    <section className={styles.puzzleGameWidget}>
      <Toolbar
        level={level}
        onRefresh={onRefresh}
        onChangeItemsCount={onChangeItemsCount}
        controls={(
          <Controls
            items={items}
            zeroIndex={zeroIndex}
            level={level}
            onMoveUp={moveUp}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            onMoveDown={moveDown}
          />
        )}
      />
      <PuzzleArea
        size={cellSize}
        level={level}
        items={items}
        isOver={isOver}
        zeroIndex={zeroIndex}
      />
    </section>
  );
}

export default PuzzleTags;
