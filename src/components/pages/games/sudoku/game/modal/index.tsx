import React from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { Action } from '@pages/games/sudoku/game';

import styles from './style.module.scss';

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
          <div className={styles.modalContent}>
            <p className={styles.title}>New Game?</p>
            <p className={styles.description}>Current game hasn't finished yet.</p>
            <div className={styles.actions}>
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
          <div className={styles.modalContent}>
            <p className={styles.title}>You win!</p>
            <p className={styles.description}>Congratulations you solved this puzzle.</p>
            <div className={styles.actions}>
              <Button variant="outlined" size="small" onClick={() => onAction(Action.CLOSE_MODAL)}>
                Cancel
              </Button>
              <Button variant="contained" size="small" onClick={onConfirm}>
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
    <div className={styles.modal}>
      <div className={styles.contentBox}>
        <IconButton onClick={onClose} className={styles.closeButton}>
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
