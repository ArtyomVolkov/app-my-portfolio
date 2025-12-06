import React from 'react';

import { NavItems } from '@pages/components/ui-kit/widget/types';

import Typography from './Typography';
import Buttons from './Buttons';
import Divider from './Divider';
import Breadcrumb from './Breadcrumb';
import ScrollView from './ScrollView';
import Tabs from './Tabs';

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
  },
  {
    key: 'divider',
    label: 'Divider',
    component: <Divider />
  },
  {
    key: 'breadcrumb',
    label: 'Breadcrumb',
    component: <Breadcrumb />
  },
  {
    key: 'scroll-view',
    label: 'Scroll View',
    component: <ScrollView />
  },
  {
    key: 'tabs',
    label: 'Tabs',
    component: <Tabs />
  }
];

export default TABS;