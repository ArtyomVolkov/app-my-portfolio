import React from 'react';

import Main from '@components/main';
import ShapeTabs from '@pages/components/shapes/tabs';

import styles from './style.module.scss';

const Shapes = () => {
  return (
    <Main className={styles.shapesPage}>
      <ShapeTabs />
    </Main>
  );
}

export default Shapes;
