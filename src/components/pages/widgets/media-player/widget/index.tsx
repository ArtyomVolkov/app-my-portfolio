import React, { useState } from 'react';

import Player from '@pages/widgets/media-player/widget/player';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const PlayerWidget = () => {
  const [fullwidth, setFullwidth] = useState(true);

  return (
    <div className={styles.playerWidget}>
      <div className={mergeClassNames([styles.navBar, !fullwidth && styles.small])}>
        <button onClick={() => setFullwidth(!fullwidth)}>resize</button>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.footer}>
          <Player />
        </div>
      </div>
    </div>
  );
}

export default PlayerWidget;
