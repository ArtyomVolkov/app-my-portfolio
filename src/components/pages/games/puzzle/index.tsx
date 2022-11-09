import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { mergeClassNames } from '@utils/common';

import './style.scss';

const generateItems = (size) => {
  const list = Array(Math.pow(size, 2)-1)
    .fill(0)
    .map((item, index) => index+1)
    .sort(() => Math.random() - 0.5);

  list.push(0);

  return list;
}

interface Puzzle {
  defaultSize?: 5|6|7,
  cellSize?: number,
}

enum KeyCodes {
  UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39
}

const Puzzle: React.FC<Puzzle> = ({ defaultSize = 5, cellSize = 40 }) => {
  const [size, setActive] = useState(defaultSize);
  const [items, setItems] = useState(generateItems(size));
  const [zeroIndex, setZeroIndex] = useState(Math.pow(defaultSize, 2)-1);

  useEffect(() => {
    console.log('use effect');
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  }, []);

  const onChangeItemsCount = (value) => {
    setActive(value);
    setZeroIndex(Math.pow(value, 2)-1);
    setItems(generateItems(value));
  };

  const horizontalMove = (index) => {
    const newItems = [...items];

    newItems[zeroIndex] = items[zeroIndex+index];
    newItems[zeroIndex+index] = items[zeroIndex];

    setItems(newItems);
    setZeroIndex(zeroIndex+index);
  };

  const verticalMove = (index) => {
    const newItems = [...items];

    newItems[zeroIndex+index] = items[zeroIndex];
    newItems[zeroIndex] = items[zeroIndex+index];

    setItems(newItems);
    setZeroIndex(zeroIndex+index);
  };

  const moveLeft = () => {
    if ((zeroIndex % size) >= size-1) {
      return;
    }
    horizontalMove(1);
  };

  const moveRight = () => {
    if (!(zeroIndex % size)) {
      return;
    }
    horizontalMove(-1);
  };

  const moveUp = () => {
    if (!items[zeroIndex+size]) {
      return;
    }
    verticalMove(+size);
  };

  const moveDown = () => {
    if (!items[zeroIndex-size]) {
      return;
    }
    verticalMove(-size);
  };

  const onKeyDown = (e) => {
    console.log(e.keyCode);
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
  }

  return (
    <section className="puzzle-game-widget" onKeyDown={onKeyDown}>
      <div className="toolbar">
        <Button size="medium" title="Refresh" variant="contained" color="error">
          <RestartAltIcon fontSize="small" />
        </Button>
        <Divider />
        <Button size="small" variant="outlined" onClick={() => onChangeItemsCount(5)}>
          <span>5X5</span>
        </Button>
        <Button size="small" variant="outlined" onClick={() => onChangeItemsCount(6)}>
          <span>6X6</span>
        </Button>
        <Button size="small" variant="outlined" onClick={() => onChangeItemsCount(7)}>
          <span>7X7</span>
        </Button>
        <Divider />
        <div className="controls">
          <div className="vertical">
            <Button size="small" variant="outlined" onClick={moveUp} disabled={!items[zeroIndex+size]}>
              <KeyboardArrowUpRoundedIcon />
            </Button>
          </div>
          <div className="horizontal">
            <Button size="small" variant="outlined" onClick={moveLeft} disabled={(zeroIndex % size) >= size-1}>
              <KeyboardArrowLeftRoundedIcon />
            </Button>
            <Button size="small" variant="outlined" onClick={moveRight} disabled={!(zeroIndex % size)}>
              <KeyboardArrowRightRoundedIcon />
            </Button>
          </div>
          <div className="vertical">
            <Button
              size="small"
              variant="outlined"
              onClick={moveDown}
              disabled={!items[zeroIndex-size]}
            >
              <KeyboardArrowDownRoundedIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="area">
        <div className="holst" style={{ width: cellSize * size }}>
          {
            items.map((item, index) => (
              <div
                key={index}
                style={{ width: cellSize, height: cellSize }}
                className={mergeClassNames([
                  'item',
                  (item - 1) === index && 'done',
                  zeroIndex === index && 'empty'
                ])}
              >
                {item}
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}

export default Puzzle;
