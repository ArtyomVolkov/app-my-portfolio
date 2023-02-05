import React, { useMemo } from 'react';

import CellBox from '@pages/games/nonogram/game/area/box';

import { mergeClassNames } from '@utils/common';

interface IMatrix {
  size: [v: number, h: number],
  blank: Array<Array<number>>,
  onBoxEnter: (row, cell) => void,
}

const Matrix: React.FC<IMatrix> = ({ size, blank, onBoxEnter }) => {
  const matrix = useMemo(() => Array(size[0]).fill(Array(size[1]).fill(1)), [size]);

  return (
    <>
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
    </>
  )
}

export default Matrix;
