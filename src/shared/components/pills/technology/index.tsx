import React from 'react';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import { Development } from '@shared/enums/develop';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

interface TechnologyPill {
  name: string,
  label: string,
  prefix?: string,
  type: Development,
}

const TechnologyPill: React.FC<TechnologyPill> = ({ name, prefix, label, type }) => {
  switch (type) {
    case Development.PL: {
      return (
        <Chip
          className={mergeClassNames([styles.technologyPill, name])}
          avatar={<Avatar className="icon">{prefix}</Avatar>}
          label={label}
          variant="filled"
          size="small"
        />
      );
    }
    case Development.TOOL:
    case Development.TECHNOLOGY: {
      return (
        <Chip
          className={styles.technologyPill}
          label={label}
          size="small"
          color={type === Development.TECHNOLOGY ? 'primary' : 'secondary'}
          variant="outlined"
        />
      )
    }
    default: return null;
  }
}

export default TechnologyPill;
