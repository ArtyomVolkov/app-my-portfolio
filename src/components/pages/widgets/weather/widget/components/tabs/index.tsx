import React, { useState } from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

export interface ITab {
  key: string;
  label: string;
  component: JSX.Element
}

interface ITabs {
  tabs: Array<ITab>;
  defaultActive?: string;
  onSelect?: (tabKey: string) => void;
}

const Tabs: React.FC<ITabs> = ({ tabs, defaultActive, onSelect }) => {
  const [activeTab, setActive] = useState(defaultActive || tabs[0].key);

  const onSelectTab = (key) => {
    setActive(key);

    if (onSelect) {
      onSelect(key);
    }
  };

  const renderTabList = (tab) => {
    return (
      <li
        key={tab.key}
        onClick={() => onSelectTab(tab.key)}
        className={mergeClassNames([styles.tabItem, tab.key === activeTab && styles.active])}
      >
        <span>{tab.label}</span>
      </li>
    )
  };

  const renderTabView = () => {
    const tabView = tabs.find((item) => item.key === activeTab);

    if (!tabView?.component) {
      return null;
    }
    return tabView.component;
  };

  return (
    <div className={styles.tabs} role="tabs">
      <ul className={styles.tabList}>
        {tabs.map(renderTabList)}
      </ul>
      <div className={styles.tabView} role="tab-panel">
        {renderTabView()}
      </div>
    </div>
  );
};

export default Tabs;