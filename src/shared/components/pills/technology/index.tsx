import React from 'react';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import { type ITechnology } from '@shared/dtos/develop';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const TechnologyPill: React.FC<ITechnology> = ({
  id,
  prefix,
  label,
  type,
}) => {
  switch (type) {
    case 'language': {
      return (
        <Chip
          className={mergeClassNames([id && styles[id]])}
          classes={{
            root: styles.technologyPill,
            label: styles.label,
            icon: styles.chipIcon,
          }}
          avatar={<Avatar className={styles.icon}>{prefix}</Avatar>}
          label={label}
          variant="filled"
          size="small"
        />
      );
    }
    case 'tool':
    case 'technology': {
      return (
        <Chip
          className={mergeClassNames([styles.technologyPill, id && styles[type]])}
          label={label}
          size="small"
          variant="outlined"
        />
      );
    }
    default:
      return null;
  }
};

export default TechnologyPill;
