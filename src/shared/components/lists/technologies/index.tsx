import React from 'react';

import TechnologyPill from '@shared/components/pills/technology';
import { type ITechnology } from '@shared/dtos/develop';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

interface TechnologyList {
  data: ITechnology[];
  vertical?: boolean;
  className?: string;
}

const TechnologyList: React.FC<TechnologyList> = ({
  data,
  vertical,
  className,
}) => {
  return (
    <div
      className={mergeClassNames([
        styles.technologyList,
        vertical && styles.vertical,
        className,
      ])}
    >
      {data.map((item) => (
        <TechnologyPill key={item.id} {...item} />
      ))}
    </div>
  );
};

export default TechnologyList;
