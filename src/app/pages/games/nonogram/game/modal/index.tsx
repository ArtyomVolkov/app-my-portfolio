import React, { useContext, useEffect } from 'react';

import Button from '@mui/material/Button';

import Modal from '@shared/components/modals/basic';
import Preview from '@pages/games/nonogram/game/preview';

import { GameContext, Action, IState, TDispatch } from '@pages/games/nonogram/game/context';
import { NONOGRAMS } from '@pages/games/nonogram/game/data';

import styles from './style.module.scss';

const GameModal = () => {
  const [crossword, dispatch] = useContext<[IState, TDispatch]>(GameContext);

  useEffect(() => {
    onCheckOpenModal()
  }, [crossword.isFinish]);

  const onCloseModal = () => {
    dispatch({ type: Action.SET_MODAL, payload: false });
  };

  const onCheckOpenModal = () => {
    if (!crossword.modal.open && crossword.isFinish) {
      dispatch({ type: Action.SET_MODAL, payload: true });
    }
  };

  const onSetNewGame = () => {
    dispatch({ type: Action.SET_NEW_GAME, payload: NONOGRAMS.guitar });
  };

  const renderContent = () => {
    return (
      <div className="modal-content">
        <div className="title">You win!</div>
        <p className="description">
          Congratulations, you decrypted that crossword.
        </p>
        <div className={styles.crosswordPreview}>
          <p className={styles.title}>{ crossword.name }</p>
          <div className={styles.previewWrap}>
            <Preview initialDraw className={styles.preview} />
          </div>
        </div>
        <div className="actions">
          <Button variant="outlined" size="small" onClick={onCloseModal}>
            Close
          </Button>
          <Button variant="contained" size="small" onClick={onSetNewGame}>
            New Game
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      className={styles.modal}
      open={crossword.modal.open}
      onClose={onCloseModal}
      renderContent={renderContent}
    />
  );
};

export default GameModal;
