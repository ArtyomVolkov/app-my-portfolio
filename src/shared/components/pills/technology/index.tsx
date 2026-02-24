import React from 'react';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import { type ITechnology } from '@shared/dtos/develop';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const TechnologyPill: React.FC<ITechnology> = ({
  name,
  prefix,
  label,
  type,
}) => {
  switch (type) {
    case 'language': {
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
    case 'tool':
    case 'technology': {
      return (
        <Chip
          className={styles.technologyPill}
          label={label}
          size="small"
          color={type === 'technology' ? 'primary' : 'secondary'}
          variant="outlined"
        />
      );
    }
    default:
      return null;
  }
};

export default TechnologyPill;
