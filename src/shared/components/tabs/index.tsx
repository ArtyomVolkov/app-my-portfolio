import React, { useState } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

export interface TabItem {
  key: string,
  label: string,
  component: React.FC<any>,
  icon?: React.ReactElement,
}

interface InlineTabs {
  tabs: Array<TabItem>,
  defaultActive?: string,
  data?: any,
}

interface TabPanel {
  children: React.ReactElement | React.ComponentElement<any, any>,
  value: string,
  name: string,
  className?: string,
}

const TabPanel: React.FC<TabPanel> = ({children, value, name, className}) => {
  return (
    <div hidden={name !== value} className={className}>
      {children}
    </div>
  );
};

const InlineTabs: React.FC<InlineTabs> = ({tabs, defaultActive, data}) => {
  const [tab, setTab] = useState(defaultActive);

  const onChangeTab = (e, tab) => {
    setTab(tab);
  };

  return (
    <>
      <Tabs
        value={tab}
        onChange={onChangeTab}
        className="tabs-header"
      >
        {
          tabs.map((item) => (
            <Tab
              key={item.key}
              icon={item.icon}
              iconPosition="start"
              label={item.label}
              value={item.key}
              className="tab-item"
            />
          ))
        }
      </Tabs>
      {
        tabs.map((item) => (
          <TabPanel
            key={item.key}
            name={item.key}
            value={tab}
            className="tab-item-content"
          >
            {Boolean(item.component) && <item.component data={data}/>}
          </TabPanel>
        ))
      }
    </>
  );
}

export default InlineTabs;
