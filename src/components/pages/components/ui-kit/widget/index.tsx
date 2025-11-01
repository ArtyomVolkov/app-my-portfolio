import React, { useState } from "react";

import TABS from "@pages/components/ui-kit/widget/tabs";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

const UiKitWidget = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].key);

  const renderTabItem = () => {
    const tabItem = TABS.find((item) => item.key === activeTab);

    if (tabItem && tabItem.component) {
      return tabItem.component;
    }
    return null;
  };

  return (
    <div className={styles.uiKitWidget}>
      <div className={styles.layout}>
        <ul className={styles.nav}>
          {TABS.map((item) => (
            <li
              key={item.key}
              className={mergeClassNames([
                styles.navItem,
                activeTab === item.key && styles.active,
              ])}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div className={styles.preview}>{renderTabItem()}</div>
      </div>
    </div>
  );
};

export default UiKitWidget;
