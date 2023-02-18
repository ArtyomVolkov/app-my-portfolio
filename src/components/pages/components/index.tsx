import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

import CategoryIcon from '@mui/icons-material/Category';

import styles from './style.module.scss';

const ComponentsPage = () => {
  return (
    <Main className={styles.componentsPage}>
      <NavButton
        path="/components/shapes"
        title="3D Shapes"
        icon={<CategoryIcon className="icon"/>}
      />
    </Main>
  );
}

export default ComponentsPage;
