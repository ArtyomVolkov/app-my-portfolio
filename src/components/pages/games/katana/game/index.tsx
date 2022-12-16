import React, { useRef, useState } from 'react';

import Panel from '@pages/games/katana/game/panel';
import Area from '@pages/games/katana/game/area';

import { CROSSWORDS } from './data';

import './style.scss';

const GameWidget = () => {
  const [crossword] = useState<any>(CROSSWORDS.guitar);
  const verticalPanelRef = useRef(null);
  const horizontalPanelRef = useRef(null);

  const onBoxHover = (row, cell) => {
    verticalPanelRef.current.setHoverLine(row, cell);
    horizontalPanelRef.current.setHoverLine(row, cell);
  };

  return (
    <section className="katana-game-widget">
      <div className="header">
        <div className="preview">
          { crossword.name }
        </div>
        <Panel
          variant="vertical"
          data={crossword.area.vertical}
          size={crossword.area.cells[0]}
          refItem={verticalPanelRef}
        />
      </div>
      <div className="body">
        <Panel
          variant="horizontal"
          data={crossword.area.horizontal}
          size={crossword.area.cells[1]}
          refItem={horizontalPanelRef}
        />
        <Area
          size={crossword.size}
          matrix={crossword.filled}
          onBoxHover={onBoxHover}
        />
      </div>
    </section>
  );
}

export default GameWidget;