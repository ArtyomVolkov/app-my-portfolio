import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

// import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import CollectionsIcon from '@mui/icons-material/Collections';
import GradientOutlinedIcon from '@mui/icons-material/GradientOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

import styles from './style.module.scss';

const WidgetsPage = () => {
  return (
    <Main className={styles.widgetsPage}>
      {/*<NavButton*/}
      {/*  path="/widgets/history"*/}
      {/*  title="History"*/}
      {/*  icon={<HistoryRoundedIcon className="icon"/>}*/}
      {/*/>*/}
      <NavButton
        path="/widgets/gallery"
        title="Gallery"
        icon={<CollectionsIcon className="icon"/>}
      />
      <NavButton
        path="/widgets/matrix"
        title="Matrix"
        icon={<GradientOutlinedIcon className="icon"/>}
      />
      <NavButton
        path="/widgets/clock"
        title="Clock"
        icon={<WatchLaterOutlinedIcon className="icon"/>}
      />
    </Main>
  );
}

export default WidgetsPage;
