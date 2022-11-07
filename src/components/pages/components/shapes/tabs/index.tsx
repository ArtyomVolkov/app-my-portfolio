import React from 'react';

import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import TonalityRoundedIcon from '@mui/icons-material/TonalityRounded';

import InlineTabs, { TabItem } from '@shared/components/tabs';
import CubeWidget from '@pages/components/shapes/tabs/cube';
import Pyramid from '@pages/components/shapes/tabs/pyramid';
import Sphere from '@pages/components/shapes/tabs/sphere';

const TABS:Array<TabItem> = [
  {
    key: 'cube',
    label: 'Cube',
    icon: <ViewInArRoundedIcon />,
    component: CubeWidget,
  },
  {
    key: 'pyramid',
    label: 'Pyramid',
    icon: <ChangeHistoryRoundedIcon />,
    component: Pyramid,
  },
  {
    key: 'sphere',
    label: 'Sphere',
    icon: <TonalityRoundedIcon />,
    component: Sphere,
  },
];

const ShapeTabs = () => (
  <InlineTabs
    tabs={TABS}
    defaultActive={TABS[0].key}
  />
);

export default ShapeTabs;
