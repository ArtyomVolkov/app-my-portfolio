import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

import SsidChartRoundedIcon from '@mui/icons-material/SsidChartRounded';

import styles from './style.module.scss';

const ChartsPage = () => {
  return (
    <Main className={styles.chartsPage}>
      <NavButton
        path="/charts/inline"
        title="Inline"
        icon={<SsidChartRoundedIcon className="icon"/>}
      />
    </Main>
  );
};

export default ChartsPage;
