import React, { useCallback, useMemo, useState } from 'react';

import CellBox from '@pages/games/katana/game/area/box';

import { mergeClassNames } from '@utils/common';

interface IArea {
  size: [v: number, h: number],
}

const Area: React.FC<IArea> = ({ size }) => {
  const [filled, setFilled] = useState(Array(size[0]).fill(Array(size[1]).fill(null)));
  const data = useMemo(() => Array(size[0]).fill(Array(size[1]).fill(1)), [size]);

  const onSelectItemBoxMemo = useCallback((row, cell) => {
    const data = filled.map((item) => item.slice());

    data[row][cell] = data[row][cell] ? null : 1;
    setFilled(data);
  }, [filled]);

  return (
    <div className="area">
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
                  index={cell}
                  filled={filled[row][cell]}
                  onPress={() => onSelectItemBoxMemo(row, cell)}
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
