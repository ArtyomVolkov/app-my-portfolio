import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import MatrixCanvas from '@pages/widgets/matrix/canvas';

import { TECHNOLOGIES } from '@pages/widgets/matrix/data';

import styles from './style.module.scss';

const Matrix = () => {
  return (
    <Main className={styles.matrixApp}>
      <h3>Matrix Effect</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <MatrixCanvas />
    </Main>
  );
};

export default Matrix;
