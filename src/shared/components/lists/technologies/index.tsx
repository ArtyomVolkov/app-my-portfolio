import React from 'react';

import TechnologyPill from '@shared/components/pills/technology';

import { mergeClassNames } from '@utils/common';
import { Technology, Language, Tool } from '@shared/interfaces/develop';

import './style.scss';

interface TechnologyList<T> {
  vertical?: boolean,
  data: T[],
}

const TechnologyList: React.FC<TechnologyList<Technology|Language|Tool>> = ({ data, vertical }) => {
  return (
    <div className={mergeClassNames(['technology-list', vertical && 'vertical'])}>
      {
        data.map((item) => (
          <TechnologyPill name={item.key} {...item} />
        ))
      }
    </div>
  );
}

export default TechnologyList;
