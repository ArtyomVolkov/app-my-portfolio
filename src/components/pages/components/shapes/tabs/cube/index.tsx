import React from 'react';

import Rotation from '@shared/components/rotation';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const CubeWidget = () => {
  return (
    <Rotation
      className={styles.cubeWidget}
      position={{ x: -45, y: -45 }}
    >
      <div className={styles.cube}>
        <div className={mergeClassNames([styles.plane, styles.top])}>TOP</div>
        <div className={mergeClassNames([styles.plane, styles.bottom])}>BOTTOM</div>
        <div className={mergeClassNames([styles.plane, styles.right])}>RIGHT</div>
        <div className={mergeClassNames([styles.plane, styles.left])}>LEFT</div>
        <div className={mergeClassNames([styles.plane, styles.front])}>FRONT</div>
        <div className={mergeClassNames([styles.plane, styles.back])}>BACK</div>
      </div>
    </Rotation>
  );
}

export default CubeWidget;
