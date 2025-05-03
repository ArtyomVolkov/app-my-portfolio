import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';

import styles from './style.module.scss';

const AppsPage = () => {
  return (
    <Main className={styles.appsPage}>
      <NavButton
        path="/apps/wine-collection"
        title="Wine collection"
        icon={<LiquorOutlinedIcon className="icon"/>}
      />
    </Main>
  );
}

export default AppsPage;
