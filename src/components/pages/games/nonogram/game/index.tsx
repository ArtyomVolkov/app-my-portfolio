import React, { useContext, useEffect, useRef } from 'react';

import ContextProvider, { GameContext, Action } from './context';

import Area from '@pages/games/nonogram/game/area';
import Panel from '@pages/games/nonogram/game/panel';
import Modal from '@pages/games/nonogram/game/modal';
import Preview from '@pages/games/nonogram/game/preview';

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

  return (
    <section className="nonogram-game-widget">
      <Modal />
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
          blank={crossword.blank}
          onBoxHover={onBoxHover}
        />
      </div>
      {
        crossword.isFinish && <div className="finish-view-wrap" />
      }
    </section>
  );
}

export default () => (
  <ContextProvider>
    <GameWidget />
  </ContextProvider>
);