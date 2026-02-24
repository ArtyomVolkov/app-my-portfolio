import React from 'react';

import Rotation from '@shared/components/rotation';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Pyramid = () => {
  return (
    <Rotation
      className={styles.pyramidWidget}
      position={{x: 0, y: -36 }}
    >
      <div className={styles.pyramid}>
        <div className={mergeClassNames([styles.plane, styles.front])} />
        <div className={mergeClassNames([styles.plane, styles.back])} />
        <div className={mergeClassNames([styles.plane, styles.left])} />
        <div className={mergeClassNames([styles.plane, styles.right])} />
        <div className={mergeClassNames([styles.plane, styles.bottom])} />
      </div>
    </Rotation>
  );
}

export default Pyramid;
