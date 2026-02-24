import Avatar from '@mui/material/Avatar';
import LiquorIcon from '@mui/icons-material/Liquor';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const AppLogo = ({ className = '' }) => {
  return (
    <Avatar className={mergeClassNames([styles.wineAppAvatar, className])}>
      <LiquorIcon className={styles.icon} />
    </Avatar>
  );
};

export default AppLogo;
