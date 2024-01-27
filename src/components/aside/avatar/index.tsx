import React from 'react';

import MuiAvatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import styles from './style.module.scss';

interface IAvatar {
  title: string,
  subtitle: string,
  image?: any
}

const Avatar: React.FC<IAvatar> = ({ title, subtitle, image }) => {
  const [firstName, lastName] = title.split(' ');

  return (
    <div className={styles.avatar}>
      <IconButton>
        <MuiAvatar>
          {
            !image ? `${firstName[0]}${lastName[0]}` : <img src={image} alt="avatar" width={40} height={40} />
          }
        </MuiAvatar>
      </IconButton>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subTitle}>{subtitle}</span>
      </div>
    </div>
  );
};

export default Avatar;
