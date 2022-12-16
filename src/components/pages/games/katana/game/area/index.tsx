import React, { useMemo, useRef, useState } from 'react';

import CellBox from '@pages/games/katana/game/area/box';

import { mergeClassNames } from '@utils/common';

enum FLOW {
  HORIZONTAL,
  VERTICAL
}

enum MouseButton {
  LEFT,
}

interface IArea {
  size: [v: number, h: number],
  matrix: Array<Array<number>>,
  onBoxHover: (row, cell) => void,
}

const Area: React.FC<IArea> = ({ size, matrix, onBoxHover }) => {
  const tooltipRef = useRef(null);
  const [filled, setFilled] = useState(Array(size[0]).fill(Array(size[1]).fill(null)));
  const data = useMemo(() => Array(size[0]).fill(Array(size[1]).fill(1)), [size]);
  const drawMode = useRef({
    active: false,
    startBox: [],
    position: [],
    filled: null,
    flow: -1,
    horizontal: [],
    vertical: [],
  });

  const onMouseDown = (e) => {
    if (e.button !== MouseButton.LEFT) {
      return false;
    }
    const { row, cell } = e.target.dataset;

    if (!row || !cell) {
      return;
    }
    const value = !filled[+row][+cell] ? 1 : null;

    if (!drawMode.current.active) {
      fillItemBox(row, cell, value);
    }

    drawMode.current.active = true;
    drawMode.current.filled = value;
    drawMode.current.startBox = [+row, +cell];
  };

  const onMouseUp = () => {
    stopDrawMode();
  };

  const onMouseLeave = () => {
    onBoxHover(-1, -1);
    stopDrawMode();
  };

  const onMouseMove = (e) => {
    if (!drawMode.current.active) {
      return;
    }
    drawMode.current.position[FLOW.HORIZONTAL] = e.clientX;
    drawMode.current.position[FLOW.VERTICAL] = e.clientY;
    tooltipRef.current.style.left = e.clientX - 50 + 'px';
    tooltipRef.current.style.top = e.clientY - 40 + 'px';
  }

  const onBoxEnter = (row, cell) => {
    onBoxHover(row, cell);

    if (!drawMode.current.active) {
      return false;
    }
    tooltipRef.current.classList.remove('hidden');

    if (drawMode.current.startBox[0] === row || drawMode.current.startBox[1] === cell) {
      setDrawData(row, cell);
      return;
    }
    stopDrawMode();
  };

  const setDrawData = (row, cell) => {
    if (drawMode.current.flow < 0) {
      drawMode.current.flow = drawMode.current.startBox[0] === row ? FLOW.HORIZONTAL : FLOW.VERTICAL;
    }

    const value = drawMode.current.flow === FLOW.HORIZONTAL
      ? drawMode.current.startBox[1] - cell
      : drawMode.current.startBox[0] - row;

    if (!value) {
      drawByAxis(row, cell, value);
      tooltipRef.current.classList.add('hidden');
      return;
    }
    tooltipRef.current.innerHTML = Math.abs(value)+1;
    drawByAxis(row, cell, value);
  };

  const drawByAxis = (row, cell, value) => {
    drawMode.current.flow === FLOW.HORIZONTAL
      ? drawByHorizontal(row, cell, value)
      : drawByVertical(row, cell, value)
  };

  const drawByVertical = (row, cell, value) => {
    if (!value) {
      fillItemBox(drawMode.current.vertical[0], cell, !drawMode.current.filled);
      drawMode.current.vertical.pop();
      return;
    }

    if (drawMode.current.vertical.includes(row)) {
      const index = drawMode.current.vertical.pop();

      fillItemBox(index, cell, !drawMode.current.filled);
      return;
    }

    drawMode.current.vertical.push(row);
    fillItemBox(row, cell, drawMode.current.filled);
  };

  const drawByHorizontal = (row, cell, value) => {
    if (!value) {
      fillItemBox(row, drawMode.current.horizontal[0], !drawMode.current.filled);
      drawMode.current.horizontal.pop();
      return;
    }

    if (drawMode.current.horizontal.includes(cell)) {
      const index = drawMode.current.horizontal.pop();

      fillItemBox(row, index, !drawMode.current.filled);
      return;
    }

    drawMode.current.horizontal.push(cell);
    fillItemBox(row, cell, drawMode.current.filled);
  };

  const fillItemBox = (row, cell, value) => {
    if (isNaN(row) || isNaN(cell)) {
      return;
    }
    const data = filled.map((item) => item.slice());

    data[row][cell] = value;
    setFilled(data);
  };

  const stopDrawMode = () => {
    drawMode.current.active = false;
    drawMode.current.startBox = [];
    drawMode.current.horizontal = [];
    drawMode.current.vertical = [];
    drawMode.current.flow = -1;
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
                  onEnter={onBoxEnter}
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
