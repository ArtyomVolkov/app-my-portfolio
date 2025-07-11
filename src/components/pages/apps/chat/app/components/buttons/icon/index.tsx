import React  from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const IconButton = ({ children, ...rest }) => {
  return (
    <span
      role="button"
      className={mergeClassNames([styles.chatAppIconButton, rest.className])}
      onClick={rest.onClick}
      data-disable={rest.disabled}
      onMouseDown={rest.onMouseDown}
      onMouseUp={rest.onMouseUp}
    >
      {children}
    </span>
  );
};

export default IconButton;