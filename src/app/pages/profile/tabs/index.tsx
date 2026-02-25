import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SummarizeIcon from '@mui/icons-material/Summarize';

import Tabs, { type TabItem } from '@shared/components/ui-kit/tabs';
import SummaryTab from '@pages/profile/tabs/summary';
import ExperienceTab from '@pages/profile/tabs/experience';

const TABS:Array<TabItem> = [
  {
    key: 'summary',
    label: 'Summary',
    icon: <SummarizeIcon />,
    component: <SummaryTab />,
  },
  {
    key: 'projects',
    label: 'Projects',
    component: <ExperienceTab />,
    icon: <AppRegistrationIcon />,
  }
];

const ProfileTabs = () => (
  <Tabs
    items={TABS}
    defaultActive={TABS[0].key}
  />
);

export default ProfileTabs;
