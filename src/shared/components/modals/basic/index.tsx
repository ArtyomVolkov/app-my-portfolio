import React from 'react';

import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

interface IModal {
  open: boolean;
  onClose: () => void;
  className?: string;
  renderContent?: () => React.ReactElement;
}

const Modal: React.FC<IModal> = ({
  open,
  onClose,
  className,
  renderContent,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className={mergeClassNames([styles.basicModal, className])}>
      <div className="content-box">
        <IconButton onClick={onClose} className="close-button">
          <Close />
        </IconButton>
        {renderContent && renderContent()}
      </div>
    </div>
  );
};

export default Modal;
