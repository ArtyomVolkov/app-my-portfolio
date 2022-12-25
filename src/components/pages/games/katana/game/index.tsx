import React, { useContext, useEffect, useRef } from 'react';

import ContextProvider, { GameContext, Action } from './context';

import Panel from '@pages/games/katana/game/panel';
import Area from '@pages/games/katana/game/area';
import Preview from '@pages/games/katana/game/preview';

import { CROSSWORDS } from './data';

import './style.scss';

const GameWidget = () => {
  useEffect(() => {
    dispatch({ type: Action.SET_DATA, payload: CROSSWORDS.guitar });

    return () => {
      dispatch({ type: Action.CLEAR_DATA });
    }
  }, []);

  const [crossword, dispatch] = useContext(GameContext);
  const verticalPanelRef = useRef(null);
  const horizontalPanelRef = useRef(null);

  const onBoxHover = (row, cell) => {
    verticalPanelRef.current.setHoverLine(row, cell);
    horizontalPanelRef.current.setHoverLine(row, cell);
  };

  if (!crossword.size) {
    return null;
  }
  // console.log(crossword.blank);

  return (
    <section className="katana-game-widget">
      <div className="header">
        <Preview />
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
          filled={crossword.filled}
          blank={crossword.blank}
          onBoxHover={onBoxHover}
        />
      </div>
    </section>
  );
}

export default () => (
  <ContextProvider>
    <GameWidget />
  </ContextProvider>
);