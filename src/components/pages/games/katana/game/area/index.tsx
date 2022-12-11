import React, { useMemo, useRef, useState } from 'react';

import CellBox from '@pages/games/katana/game/area/box';

import { mergeClassNames } from '@utils/common';

interface IArea {
  size: [v: number, h: number],
  matrix: Array<Array<number>>,
}

const Area: React.FC<IArea> = ({ size, matrix }) => {
  const tooltipRef = useRef(null);
  const drawMode = useRef({ active: false, startBox: [], position: [] });
  const [filled, setFilled] = useState(Array(size[0]).fill(Array(size[1]).fill(null)));
  const data = useMemo(() => Array(size[0]).fill(Array(size[1]).fill(1)), [size]);

  const onMouseDown = (e) => {
    const { row, cell } = e.target.dataset;

    if (!drawMode.current.active) {
      fillItemBox(row, cell);
    }

    drawMode.current.active = true;
    drawMode.current.startBox = [+row, +cell];
  };

  const onMouseUp = () => {
    stopDrawMode();
  };

  const onMouseLeave = () => {
    stopDrawMode();
  };

  const onMouseMove = (e) => {
    if (!drawMode.current.active) {
      return;
    }
    drawMode.current.position[0] = e.clientX;
    drawMode.current.position[1] = e.clientY;
    tooltipRef.current.style.left = e.clientX - 50 + 'px';
    tooltipRef.current.style.top = e.clientY - 40 + 'px';
  }

  const onMouseEnter = (row, cell) => {
    if (!drawMode.current.active) {
      return false;
    }
    tooltipRef.current.classList.remove('hidden');

    if (drawMode.current.startBox[0] === row) {
      setPosition(drawMode.current.startBox[1] - cell);
      fillItemBox(row, cell);
      return;
    }
    if (drawMode.current.startBox[1] === cell) {
      setPosition(drawMode.current.startBox[0] - row);
      fillItemBox(row, cell);
      return;
    }
    stopDrawMode();
  };

  const setPosition = (value) => {
    if (!value) {
      tooltipRef.current.classList.add('hidden');
      return;
    }
    tooltipRef.current.innerHTML = Math.abs(value) + 1;
  };

  const fillItemBox = (row, cell) => {
    if (isNaN(row) || isNaN(cell)) {
      return;
    }
    const data = filled.map((item) => item.slice());

    data[row][cell] = data[row][cell] ? null : 1;
    setFilled(data);
  };

  const stopDrawMode = () => {
    drawMode.current.active = false;
    drawMode.current.startBox = [];
    tooltipRef.current.classList.add('hidden');
  };

  return (
    <div
      className="area"
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
    >
      <div className="tooltip hidden" ref={tooltipRef}></div>
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
