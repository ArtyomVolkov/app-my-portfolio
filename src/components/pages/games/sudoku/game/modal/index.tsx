import React from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { Action } from '@pages/games/sudoku/game';

import './style.scss';

export enum ModalType {
  CONFIRM,
  FINISH,
}

interface Modal {
  data: {
    open: boolean,
    type: ModalType,
    onConfirm?: () => void,
  }
  onAction: (type: Action) => void,
}

const Modal: React.FC<Modal> = ({ data, onAction }) => {
  if (!data.open) {
    return null;
  }

  const onClose = () => {
    onAction(Action.CLOSE_MODAL);
  };

  const onConfirm = () => {
    if (data.onConfirm) {
      onAction(Action.CLOSE_MODAL);
      data.onConfirm();
    }
  };

  const renderContent = () => {
    switch (data.type) {
      case ModalType.CONFIRM: {
        return (
          <div className="modal-content">
            <p className="title">New Game?</p>
            <p className="description">Current game hasn't finished yet.</p>
            <div className="actions">
              <Button variant="outlined" size="small" onClick={() => onAction(Action.CLOSE_MODAL)}>
                Cancel
              </Button>
              <Button variant="contained" size="small" onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        )
      }
      case ModalType.FINISH: {
        return (
          <div className="modal-content">
            <p className="title">You win!</p>
            <p className="description">Congratulations you solved this puzzle.</p>
            <div className="actions">
              <Button variant="outlined" size="small" onClick={() => onAction(Action.CLOSE_MODAL)}>
                Cancel
              </Button>
              <Button variant="contained" size="small">
                New Game
              </Button>
            </div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="modal">
      <div className="content-box">
        <IconButton onClick={onClose} className="close-button">
          <Close />
        </IconButton>
        {
          renderContent()
        }
      </div>
    </div>
  );
}

export default Modal;
