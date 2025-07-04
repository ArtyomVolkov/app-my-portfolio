import React from 'react';

import { useModal, ANIMATION_DURATION } from '../../store/modal';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const AppModal = () => {
  const { close, modals } = useModal((store) => store);

  const onBackdropClick = (e, item) => {
    if (!item.onClose) {
      return;
    }
    close(item.key);
  };

  const onModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={styles.chatAppModals}
      style={{ visibility: modals.length > 0 ? 'visible' : 'hidden'}}
    >
      {
        modals.map((item) => (
          <div
            key={item.key}
            className={mergeClassNames([styles.fallback, item.hide && styles.hidden])}
            onClick={(e) => onBackdropClick(e, item)}
            style={{
              animationDuration: `${ANIMATION_DURATION}ms`
            }}
          >
            <div
              className={styles.modal}
              onClick={onModalClick}
              style={{
                animationDuration: `${ANIMATION_DURATION}ms`
              }}
            >
              {item.content}
            </div>
          </div>
        ))
      }
    </div>
  )
};

export default AppModal;