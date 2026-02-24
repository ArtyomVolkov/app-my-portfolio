import React from 'react';

export type NavItem = {
  key: string;
  label: string,
  component?: React.ReactNode;
}

export type NavItems = Array<NavItem>;