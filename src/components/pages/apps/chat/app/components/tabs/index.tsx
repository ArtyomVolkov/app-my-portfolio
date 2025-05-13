import React, { useState } from 'react';

import styles from './style.module.scss';
import { mergeClassNames } from '@utils/common';

type Tab = {
  key: string,
  label: string,
  icon?: JSX.Element,
  component?: JSX.Element
}

type Props = {
  tabs: Array<Tab>,
  classes?: {}
}

const Tabs: React.FC<Props> = ({ tabs, ...rest }) => {
  const [active, setActive] = useState(tabs[0]?.key);

  const renderTabContent = () => {
    return tabs.find((item) => item.key === active)?.component;
  }

  return (
    <div className={styles.tabs} {...rest}>
      <div className={styles.header}>
        {tabs.map((item) => (
          <div
            key={item.key}
            className={mergeClassNames([styles.tabItem, item.key === active && styles.active])}
            onClick={() => setActive(item.key)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.body}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Tabs;