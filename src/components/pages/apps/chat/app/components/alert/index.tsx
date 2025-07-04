import React from 'react';

import styles from './style.module.scss';

import { mergeClassNames } from '@utils/common';

type AlertProps = {
  variant: 'success'|'error'|'info',
  message: string,
  onClose?: () => void;
  className?: string
}

const Alert: React.FC<AlertProps> = ({ variant , message, onClose, className }) => {
  return (
    <div className={mergeClassNames([className, styles.chatAppAlert, styles[variant]])}>
      <span className={styles.message}>{message}</span>
      {
        onClose && (
          <span className={styles.close} onClick={onClose}>✖</span>
        )
      }
    </div>
  )
};

export default Alert;
