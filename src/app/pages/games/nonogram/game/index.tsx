import React, { useContext, useEffect, useRef } from 'react';

import ContextProvider, { Action, GameContext } from './context';

import Area from '@pages/games/nonogram/game/area';
import Panel, { EVariant } from '@pages/games/nonogram/game/panel';
import Modal from '@pages/games/nonogram/game/modal';
import Preview from '@pages/games/nonogram/game/preview';

import styles from './style.module.scss';

const GameWidget = () => {
  useEffect(() => {
    dispatch({ type: Action.SET_NEW_GAME });

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

  const renderContent = () => {
    if (crossword.loading) {
      return <span>Loading...</span>
    }

    return (
      <>
        <Modal />
        <div className={styles.header}>
          <Preview />
          <Panel
            variant={EVariant.Vertical}
            data={crossword.panel.vertical}
            refItem={verticalPanelRef}
          />
        </div>
        <div className={styles.body}>
          <Panel
            variant={EVariant.Horizontal}
            data={crossword.panel.horizontal}
            refItem={horizontalPanelRef}
          />
          <Area
            size={crossword.size}
            blank={crossword.blank}
            onBoxHover={onBoxHover}
          />
        </div>
        {
          crossword.isFinish && <div className={styles.finishViewWrap} />
        }
      </>
    )
  }

  return (
    <section className={styles.gameWidget}>
      { renderContent() }
    </section>
  );
}

export default () => (
  <ContextProvider>
    <GameWidget />
  </ContextProvider>
);