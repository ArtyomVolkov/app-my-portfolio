import React from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

type ButtonProps = {
  variant?: 'default'|'primary'|'secondary';
  shape?: 'contained'| 'outlined'
  text?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  shape = 'contained',
  text,
  className,
  disabled,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      data-variant={variant}
      data-shape={shape}
      disabled={disabled}
      className={mergeClassNames([
        styles.chatAppButton,
        className
      ])}
    >
      {text}
    </button>
  );
};

export default Button;