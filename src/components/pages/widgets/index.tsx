import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

// import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import CollectionsIcon from '@mui/icons-material/Collections';
import PlayIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

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
        path="/widgets/media-player"
        title="Player"
        icon={<PlayIcon className="icon"/>}
      />
    </Main>
  );
}

export default WidgetsPage;
