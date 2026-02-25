import React from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

type MainProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string | null;
};

const Main: React.FC<MainProps> = ({ children, className = null }) => (
  <main className={mergeClassNames([styles.main, className])}>{children}</main>
);

export default Main;
