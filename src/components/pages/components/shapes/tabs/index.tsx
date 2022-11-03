import React from 'react';

import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import TonalityRoundedIcon from '@mui/icons-material/TonalityRounded';

import InlineTabs, { TabItem } from '@shared/components/tabs';
import CubeWidget from '@pages/components/shapes/tabs/cube';

const TABS:Array<TabItem> = [
  {
    key: 'cube',
    label: 'Cube',
    icon: <ViewInArRoundedIcon />,
    component: CubeWidget,
  },
  {
    key: 'triangle',
    label: 'Triangle',
    icon: <ChangeHistoryRoundedIcon />,
    component: () => (<h1>Triangle</h1>),
  },
  {
    key: 'sphere',
    label: 'Sphere',
    icon: <TonalityRoundedIcon />,
    component: () => (<h1>Sphere</h1>),
  },
];

const ShapeTabs = () => (
  <InlineTabs
    tabs={TABS}
    defaultActive={TABS[0].key}
  />
);

export default ShapeTabs;
