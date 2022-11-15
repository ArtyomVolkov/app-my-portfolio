import React, { useState } from 'react';

import BoxItem from './box-item';

interface GameArea {
  blank: Array<Array<number>>,
  data: Array<Array<number>>,
}

const GameArea: React.FC<GameArea> = ({ blank, data }) => {
  const [active, setActive] = useState([-1, -1]);

  const onSetActive = ([row, cell]) => {
    if (active[0] === row && active[1] === cell) {
      return;
    }
    setActive([row, cell]);
  };

  return (
    <div className="area">
      {
        data.map((item, rowIndex) => (
          <div className="box-area" key={rowIndex}>
            {
              item.map((item, cellIndex) => (
                <BoxItem
                  key={cellIndex}
                  value={item}
                  active={active[0] === rowIndex && active[1] === cellIndex}
                  onPress={() => onSetActive([rowIndex, cellIndex])}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default GameArea;
