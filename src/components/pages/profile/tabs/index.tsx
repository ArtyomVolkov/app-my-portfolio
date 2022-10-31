import React from 'react';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SummarizeIcon from '@mui/icons-material/Summarize';

import InlineTabs, { TabItem } from '@shared/components/tabs';
import SummaryTab from '@pages/profile/tabs/summary';
import ExperienceTab from '@pages/profile/tabs/experience';

const TABS:Array<TabItem> = [
  {
    key: 'summary',
    label: 'Summary',
    icon: <SummarizeIcon />,
    component: SummaryTab,
  },
  {
    key: 'experience',
    label: 'Experience',
    component: ExperienceTab,
    icon: <AppRegistrationIcon />,
  }
];

const ProfileTabs = () => (
  <InlineTabs
    tabs={TABS}
    defaultActive={TABS[0].key}
  />
);

export default ProfileTabs;
