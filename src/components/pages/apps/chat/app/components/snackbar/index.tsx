import React from 'react';

import { useSnackbar } from '../../store/snackbar';

import { mergeClassNames } from '@utils/common';

import { ANIMATION_DURATION } from '../../store/snackbar';

import styles from './style.module.scss';

const Snackbar = () => {
  const { stack, close } = useSnackbar((store) => store);

  const onMessageClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={styles.chatAppSnackbar}
      style={{ visibility: stack.length > 0 ? 'visible' : 'hidden'}}
    >
      {
        stack.map((item) => (
          <div
            key={item.key}
            onClick={onMessageClick}
            data-variant={item.variant}
            className={mergeClassNames([styles.message, item.hide && styles.hidden])}
            style={{animationDuration: `${ANIMATION_DURATION}ms` }}
          >
            {item.content}
            {
              item.closeButton && (
                <span className={styles.closeButton} onClick={() => close(item.key)}>&#x2715;</span>
              )
            }
            {
              item.autoHide && (
                <span className={styles.autoHide}>
                  <span
                    className={styles.progress}
                    style={{
                      animationDuration: `${item.autoHide}ms`
                    }}
                  />
                </span>
              )
            }
          </div>
        ))
      }
    </div>
  )
};

export default Snackbar;