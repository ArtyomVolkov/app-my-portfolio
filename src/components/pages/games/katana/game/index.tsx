import React, { useState } from 'react';

import Panel from '@pages/games/katana/game/panel';
import Area from '@pages/games/katana/game/area';

import { CROSSWORDS } from './data';

import './style.scss';

const GameWidget = () => {
  const [crossword] = useState<any>(CROSSWORDS.guitar);

  return (
    <section className="katana-game-widget">
      <div className="header">
        <div className="preview">
          { crossword.name }
        </div>
        <Panel
          data={crossword.area.vertical}
          size={crossword.area.cells[0]}
          variant="vertical"
        />
      </div>
      <div className="body">
        <Panel
          data={crossword.area.horizontal}
          size={crossword.area.cells[1]}
          variant="horizontal"
        />
        <Area
          size={crossword.size}
          matrix={crossword.filled}
        />
      </div>
    </section>
  );
}

export default GameWidget;