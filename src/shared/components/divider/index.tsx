import React from 'react';

import styles from './style.module.scss';
import { mergeClassNames } from '@utils/common';

interface IDivider {
  title?: string;
  classes?: {
    main?: string;
    title?: string;
    hr?: string
  };
}

const Divider: React.FC<IDivider> = ({title, classes}) => {
  return (
    <div className={mergeClassNames([styles.divider, classes?.main])}>
      <span className={mergeClassNames([styles.hr, classes?.hr])} />
      <span className={classes?.title}>{title}</span>
      <span className={mergeClassNames([styles.hr, classes?.hr])} />
    </div>
  );
}

export default Divider;