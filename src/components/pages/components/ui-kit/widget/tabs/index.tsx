import React from 'react';

import { NavItems } from '@pages/components/ui-kit/widget/types';

import Typography from './Typography';
import Buttons from './Buttons';

const TABS: NavItems = [
  {
    key: 'typography',
    label: 'Typography',
    component: <Typography />
  },
  {
    key: 'buttons',
    label: 'Buttons',
    component: <Buttons />
  }
];

export default TABS;