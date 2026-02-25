import React, {
  useMemo,
  useImperativeHandle,
  useRef,
  useState,
  useContext,
} from 'react';

import CellBox from '@pages/games/nonogram/game/panel/cell';

import { mergeClassNames } from '@utils/common';
import {
  GameContext,
  Action,
  type GamePayload,
} from '@pages/games/nonogram/game/context';

import styles from './style.module.scss';

export const EVariant = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
};

export type TVariant = (typeof EVariant)[keyof typeof EVariant];

interface IPanel {
  variant: TVariant;
  data: {
    blank: Array<Array<number>>;
    filled: Array<Array<number>>;
  };
  refItem: React.Ref<{ setHoverLine: (row: number, cell: number) => void }>;
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
    return Math.max(...data.blank.map((item) => (item ? item.length : 0)));
  }, [data]);
  const items = useMemo(() => Array(size).fill(1), [size]);

  const setHoverLine = (row: number, cell: number) =>
    setHoverIndex(variant === EVariant.Vertical ? cell : row);

  const onFillBox = (row: number, cell: number, value: number) => {
    const panel = crossword.panel[variant as keyof typeof crossword.panel];

    data.filled[row][cell] = value;

    dispatch({
      type: Action.FILL_BOX_PANEL,
      payload: {
        variant,
        panel,
      } as GamePayload,
    });
  };

  return (
    <div
      className={mergeClassNames([styles.panel, variant])}
      ref={containerRef}
    >
      {data.blank.map((item, index, list) => (
        <div
          key={index}
          className={mergeClassNames([
            styles.row,
            index === hoverIndex && styles.hover,
            index !== list.length - 1 && !((index + 1) % 5) && styles.divider,
          ])}
        >
          {items.map((_, i) => (
            <CellBox
              key={i}
              filled={Boolean(
                crossword.panel[variant as keyof typeof crossword.panel]
                  .filled?.[index]?.[i]
              )}
              onPress={(value) => onFillBox(index, i, value)}
              value={item[item.length - 1 - i]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Panel;
