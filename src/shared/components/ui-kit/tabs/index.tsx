import React, { useEffect, useMemo } from "react";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type TabItem = {
  key: string;
  label: string;
  icon?: React.ReactNode | string;
  disabled?: boolean;
  component: React.ReactNode | string | Array<React.ReactNode | string>;
};

type TabProps = {
  items: TabItem[];
  vertical?: boolean;
  fullWidth?: boolean;
  defaultActive?: string;
  classes?: {
    root?: string;
    header?: string;
    tab?: string;
    body?: string;
  };
};

const Tabs: React.FC<TabProps> = ({
  items,
  defaultActive,
  fullWidth,
  vertical,
  classes,
}) => {
  const [activeTab, setActiveTab] = React.useState<string>(
    defaultActive || items[0]?.key || ""
  );

  const onSetActiveTab = (item: TabItem) => {
    if (!item.disabled) {
      setActiveTab(item.key);
    }
  };

  const renderTabContent = () => {
    const tab = items.find((item) => item.key === activeTab);

    if (!tab) {
      return null;
    }
    return tab.component;
  };

  return (
    <div
      className={mergeClassNames([
        styles.Tabs,
        vertical && styles.vertical,
        classes?.root,
      ])}
    >
      <div className={mergeClassNames([styles.header, classes?.header])}>
        {items.map((item) => (
          <div
            key={item.key}
            className={mergeClassNames([
              styles.tab,
              fullWidth && styles.fullWidth,
              item.key === activeTab && styles.active,
              item.disabled && styles.disabled,
              classes?.tab,
            ])}
            onClick={() => onSetActiveTab(item)}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span> {item.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.body}>{renderTabContent()}</div>
    </div>
  );
};

export default Tabs;
