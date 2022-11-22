import React from 'react';

import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { Action } from '@pages/games/sudoku/game';
import Button from '@mui/material/Button';

export enum ModalType {
  CONFIRM,
  FINISH,
}

interface ModalWrap {
  open: boolean,
  type: ModalType,
  onAction: (type: Action) => void,
}

const ModalWrap: React.FC<ModalWrap> = ({ open, type, onAction }) => {
  if (!open) {
    return null;
  }

  const onClose = () => {
    onAction(Action.CLOSE_MODAL);
  };

  const renderContent = () => {
    switch (type) {
      case ModalType.CONFIRM: {
        return (
          <div className="confirm-type">
            <p className="title">New Game?</p>
            <p className="description">Current game hasn't finished yet.</p>
            <div className="actions">
              <Button variant="contained" size="small">
                Confirm
              </Button>
            </div>
          </div>
        )
      }
      case ModalType.FINISH: {
        return (
          <div>
            <h1>You Win!</h1>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="modal-wrap">
      <div className="content">
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

export default ModalWrap;
