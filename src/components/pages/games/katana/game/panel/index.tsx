import React, { useMemo } from 'react';

import { mergeClassNames } from '@utils/common';

interface IPanel {
  data: Array<Array<number>>,
  size: number,
  variant: 'vertical'|'horizontal',
}

const Panel: React.FC<IPanel> = ({ data, variant, size }) => {
  const items = useMemo(() => Array(size).fill(1), [size]);

  return (
    <div className={mergeClassNames(['panel', variant])}>
      {
        data.map((item, index, list) => (
          <div
            key={index}
            className={mergeClassNames([
              'row',
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
