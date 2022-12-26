import React, { useContext, useMemo, useRef } from 'react';

import CellBox from '@pages/games/katana/game/area/box';

import { mergeClassNames } from '@utils/common';

import { Action, EBoxState, GameContext, IState, TDispatch } from '@pages/games/katana/game/context';

const TooltipAxisOffset = {
  x: 50,
  y: 40,
};

enum EFlow {
  HORIZONTAL,
  VERTICAL
}

enum EMouseButton {
  LEFT,
  MIDDLE = 1,
  RIGHT = 2
}

interface IArea {
  size: [v: number, h: number],
  blank: Array<Array<number>>,
  onBoxHover: (row, cell) => void,
}

const Area: React.FC<IArea> = ({ size, blank, onBoxHover }) => {
  const tooltipRef = useRef(null);
  const [,dispatch] = useContext<[IState, TDispatch]>(GameContext);
  const matrix = useMemo(() => Array(size[0]).fill(Array(size[1]).fill(1)), [size]);

  const drawMode = useRef({
    active: false,
    startBox: [],
    position: [],
    filled: null,
    flow: -1,
    horizontal: [],
    vertical: [],
  });

  const onContextMenu = (e) => {
    e.preventDefault();
  };

  const onMouseDown = (e) => {
    if (e.button === EMouseButton.MIDDLE) {
      return false;
    }
    const { row, cell } = e.target.dataset;

    if (!row || !cell) {
      return;
    }
    let value;

    switch (e.button) {
      case EMouseButton.RIGHT: {
        value = blank[+row][+cell] === EBoxState.Cross ? EBoxState.Empty : EBoxState.Cross;
        break;
      }
      case EMouseButton.LEFT: {
        value = blank[+row][+cell] === EBoxState.Filled ? EBoxState.Empty : EBoxState.Filled;
      }
    }
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
    drawMode.current.position[EFlow.HORIZONTAL] = e.clientX;
    drawMode.current.position[EFlow.VERTICAL] = e.clientY;
    tooltipRef.current.style.left = e.clientX - TooltipAxisOffset.x + 'px';
    tooltipRef.current.style.top = e.clientY - TooltipAxisOffset.y + 'px';
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
      drawMode.current.flow = drawMode.current.startBox[0] === row ? EFlow.HORIZONTAL : EFlow.VERTICAL;
    }

    const value = drawMode.current.flow === EFlow.HORIZONTAL
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
    drawMode.current.flow === EFlow.HORIZONTAL
      ? drawByHorizontal(row, cell, value)
      : drawByVertical(row, cell, value)
  };

  const drawByVertical = (row, cell, value) => {
    if (!value) {
      if (!drawMode.current.filled) {
        return;
      }
      fillItemBox(drawMode.current.vertical[0], cell, !drawMode.current.filled);
      drawMode.current.vertical.pop();
      return;
    }

    if (drawMode.current.vertical.includes(row)) {
      if (!drawMode.current.filled) {
        return;
      }
      fillItemBox(drawMode.current.vertical.pop(), cell, !drawMode.current.filled);
      return;
    }

    drawMode.current.vertical.push(row);
    fillItemBox(row, cell, drawMode.current.filled);
  };

  const drawByHorizontal = (row, cell, value) => {
    if (!value) {
      if (!drawMode.current.filled) {
        return;
      }
      fillItemBox(row, drawMode.current.horizontal[0], !drawMode.current.filled);
      drawMode.current.horizontal.pop();
      return;
    }

    if (drawMode.current.horizontal.includes(cell)) {
      if (!drawMode.current.filled) {
        return;
      }
      fillItemBox(row, drawMode.current.horizontal.pop(), !drawMode.current.filled);
      return;
    }

    drawMode.current.horizontal.push(cell);
    fillItemBox(row, cell, drawMode.current.filled);
  };

  const fillItemBox = (row, cell, value) => {
    if (isNaN(row) || isNaN(cell)) {
      return;
    }
    dispatch({
      type: Action.FILL_BOX,
      payload: {
        row, cell, value
      }
    });
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
      onContextMenu={onContextMenu}
    >
      <div className="tooltip hidden" ref={tooltipRef} />
      {
        matrix.map((item, row, list) => (
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
                  state={blank[row][cell]}
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
