import React from 'react';

import styles from './style.module.scss';

const UiKitWidget = () => {
  return (
    <div className={styles.uiKitWidget}>
      <div className={styles.layout}>
        <ul className={styles.nav}>
          <li>Buttons</li>
        </ul>
        <div className={styles.preview}>
          Preview
        </div>
      </div>
    </div>
  );
}

export default UiKitWidget;
