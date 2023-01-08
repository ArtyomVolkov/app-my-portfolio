import React, { useMemo, useImperativeHandle, useRef, useState } from 'react';

import CellBox from '@pages/games/nonogram/game/panel/cell';

import { mergeClassNames } from '@utils/common';

export enum EVariant {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

interface IPanel {
  size: number,
  variant: EVariant,
  data: Array<Array<number>>,
  refItem: React.Ref<{setHoverLine: (row, cell) => void }>,
}

const Panel: React.FC<IPanel> = ({ data, variant, size, refItem }) => {
  useImperativeHandle(refItem, () => ({ setHoverLine }));

  const [hoverIndex, setHoverIndex] = useState(-1);
  const containerRef = useRef<any>(null);
  const items = useMemo(() => Array(size).fill(1), [size]);

  const setHoverLine = (row, cell) => setHoverIndex(variant === EVariant.Vertical ? cell : row);

  return (
    <div className={mergeClassNames(['panel', variant])} ref={containerRef}>
      {
        data.map((item, index, list) => (
          <div
            key={index}
            className={mergeClassNames([
              'row',
              index === hoverIndex && 'hover',
              (index !== list.length-1) && !((index+1)%5) && 'divider'
            ])}
          >
            {
              items.map((cell, i) => (
                <CellBox
                  key={i}
                  value={item[item.length-1-i]}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default Panel;
