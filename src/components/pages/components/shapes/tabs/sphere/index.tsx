import React from 'react';

import Rotation from '@shared/components/rotation';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Sphere = () => {
  return (
    <Rotation
      className={styles.sphereWidget}
      position={{ x: 45, y: 65 }}
    >
      <div className={styles.sphere}>
        <div className={mergeClassNames([styles.plane, styles.northX])} />
        <div className={mergeClassNames([styles.plane, styles.northEastX])} />
        <div className={mergeClassNames([styles.plane, styles.eastX])} />
        <div className={mergeClassNames([styles.plane, styles.southEastX])} />
        <div className={mergeClassNames([styles.plane, styles.northY])} />
        <div className={mergeClassNames([styles.plane, styles.northEastY])} />
        <div className={mergeClassNames([styles.plane, styles.eastY])} />
        <div className={mergeClassNames([styles.plane, styles.southEastY])} />
      </div>
    </Rotation>
  );
}

export default Sphere;
