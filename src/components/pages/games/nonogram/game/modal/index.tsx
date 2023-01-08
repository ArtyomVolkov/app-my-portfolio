import React, { useContext, useEffect } from 'react';

import Button from '@mui/material/Button';

import Modal from '@shared/components/modals/basic';
import Preview from '@pages/games/nonogram/game/preview';

import { GameContext, Action } from '@pages/games/nonogram/game/context';

const GameModal = () => {
  const [crossword, dispatch] = useContext(GameContext);

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

  };

  const renderContent = () => {
    return (
      <div className="modal-content">
        <div className="title">You win!</div>
        <p className="description">
          Congratulations, you decrypted that crossword.
        </p>
        <div className="crossword-preview">
          <p className="title">{ crossword.name }</p>
          <div className="preview-wrap">
            <Preview initialDraw />
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
      open={crossword.modal.open}
      className="game-modal"
      onClose={onCloseModal}
      renderContent={renderContent}
    />
  );
};

export default GameModal;
