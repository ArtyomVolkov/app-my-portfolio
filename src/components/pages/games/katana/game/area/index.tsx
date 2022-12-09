import React, { useMemo, useRef, useState } from 'react';

import CellBox from '@pages/games/katana/game/area/box';

import { mergeClassNames } from '@utils/common';

interface IArea {
  size: [v: number, h: number],
  matrix: Array<Array<number>>,
}

const Area: React.FC<IArea> = ({ size, matrix }) => {
  const drawMode = useRef({ active: false, startBox: [] });
  const [filled, setFilled] = useState(Array(size[0]).fill(Array(size[1]).fill(null)));
  const data = useMemo(() => Array(size[0]).fill(Array(size[1]).fill(1)), [size]);

  const onMouseDown = (e) => {
    const { row, cell } = e.target.dataset;

    drawMode.current.active = true;
    drawMode.current.startBox = [+row, +cell];
  };

  const onMouseUp = () => {
    stopDrawMode();
  };

  const onMouseLeave = () => {
    stopDrawMode();
  };

  const onMouseEnter = (row, cell) => {
    if (!drawMode.current.active) {
      return false;
    }
    if (drawMode.current.startBox[0] === row) {
      fillItemBox(row, cell);
      return;
    }
    if (drawMode.current.startBox[1] === cell) {
      fillItemBox(row, cell);
      return;
    }
    stopDrawMode();
  };

  const fillItemBox = (row, cell) => {
    const data = filled.map((item) => item.slice());

    data[row][cell] = data[row][cell] ? null : 1;
    setFilled(data);
  };

  const stopDrawMode = () => {
    drawMode.current.active = false;
    drawMode.current.startBox = [];
  };

  return (
    <div
      className="area"
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
    >
      {
        data.map((item, row, list) => (
          <div
            key={row}
            className={mergeClassNames([
              'row',
              (row !== list.length-1) && !((row+1)%5) && 'divider'
            ])}
          >
            {
              item.map((item, cell, list) => (
                <CellBox
                  key={cell}
                  row={row}
                  cell={cell}
                  filled={filled[row][cell]}
                  incorrect={filled[row][cell] && !matrix[row].includes(cell)}
                  onPress={fillItemBox}
                  onEnter={onMouseEnter}
                  size={list.length - 1}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default Area;
