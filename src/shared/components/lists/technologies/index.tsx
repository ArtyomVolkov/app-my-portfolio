import React from 'react';

import TechnologyPill from '@shared/components/pills/technology';

import { mergeClassNames } from '@utils/common';
import { Technology, Language, Tool } from '@shared/interfaces/develop';

import styles from './style.module.scss';

interface TechnologyList<T> {
  data: T[],
  vertical?: boolean,
  className?: string
}

const TechnologyList: React.FC<TechnologyList<Technology|Language|Tool>> = ({ data, vertical, className }) => {
  return (
    <div className={mergeClassNames([styles.technologyList, vertical && styles.vertical, className])}>
      {
        data.map((item) => (
          <TechnologyPill name={item.key} {...item} />
        ))
      }
    </div>
  );
}

export default TechnologyList;
