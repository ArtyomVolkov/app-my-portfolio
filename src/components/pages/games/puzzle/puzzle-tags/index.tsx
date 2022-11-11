import React, { useEffect, useState } from 'react';

import PuzzleArea from '@pages/games/puzzle/puzzle-tags/area';
import Toolbar from '@pages/games/puzzle/puzzle-tags/toolbar';
import Controls from '@pages/games/puzzle/puzzle-tags/toolbar/controls';

import './style.scss';

const generateItems = (size) => {
  const list = Array(Math.pow(size, 2)-1)
    .fill(0)
    .map((item, index) => index+1)
    .sort(() => Math.random() - 0.5);

  list.push(0);

  return list;
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
    <section className="puzzle-game-widget">
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
