import React, { useMemo, useImperativeHandle, useRef, useState, useContext } from 'react';

import CellBox from '@pages/games/nonogram/game/panel/cell';

import { mergeClassNames } from '@utils/common';
import { GameContext, Action } from '@pages/games/nonogram/game/context';

export enum EVariant {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

interface IPanel {
  variant: EVariant,
  data: {
    blank: Array<Array<number>>,
    filled: Array<Array<number>>,
  },
  refItem: React.Ref<{setHoverLine: (row, cell) => void }>,
}

const Panel: React.FC<IPanel> = ({ data, variant, refItem }) => {
  const [crossword, dispatch] = useContext(GameContext);
  useImperativeHandle(refItem, () => ({ setHoverLine }));

  const [hoverIndex, setHoverIndex] = useState(-1);
  const containerRef = useRef<any>(null);
  const size = useMemo(() => {
    if (!data.blank.length) {
      return 0;
    }
    return Math.max(
      ...data.blank.map((item) => item ? item.length : 0)
    )
  }, [data]);
  const items = useMemo(() => Array(size).fill(1), [size]);

  const setHoverLine = (row, cell) => setHoverIndex(variant === EVariant.Vertical ? cell : row);

  const onFillBox = (row, cell, value) => {
    const panel = crossword.panel[variant];

    data.filled[row][cell] = value;

    dispatch({
      type: Action.FILL_BOX_PANEL,
      payload: {
        variant,
        panel,
      }
    });
  };

  return (
    <div className={mergeClassNames(['panel', variant])} ref={containerRef}>
      {
        data.blank.map((item, index, list) => (
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
                  filled={crossword.panel[variant].filled?.[index]?.[i]}
                  onPress={(value) => onFillBox(index, i, value)}
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
