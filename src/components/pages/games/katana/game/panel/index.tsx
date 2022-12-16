import React, { useMemo, useImperativeHandle, useRef, useState } from 'react';

import { mergeClassNames } from '@utils/common';

interface IPanel {
  data: Array<Array<number>>,
  size: number,
  variant: 'vertical'|'horizontal',
  refItem: React.Ref<{setHoverLine: (row, cell) => void }>,
}

const Panel: React.FC<IPanel> = ({ data, variant, size, refItem }) => {
  useImperativeHandle(refItem, () => ({ setHoverLine }));

  const [hoverIndex, setHoverIndex] = useState(-1);
  const containerRef = useRef<any>(null);
  const items = useMemo(() => Array(size).fill(1), [size]);

  const setHoverLine = (row, cell) => setHoverIndex(variant === 'vertical' ? cell : row);

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
                <div
                  key={i}
                  className="cell"
                >
                  {item[item.length-1-i]}
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default Panel;
