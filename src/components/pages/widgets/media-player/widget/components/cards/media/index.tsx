import React from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

interface IMediaCard {
  image: string,
  title: string,
  subtitle?: string,
  onPress?: () => void,
  className?: string,
}

const MediaCard: React.FC<IMediaCard> = ({ image, title, subtitle, className, onPress }) => {
  return (
    <div
      onClick={onPress}
      className={mergeClassNames([styles.mediaCard, className])}
    >
      <div className={styles.image}>
        <img
          alt="album"
          src={image}
        />
      </div>
      <div className={styles.captions}>
        <label className={styles.title}>{ title }</label>
        {
          subtitle && (
            <label className={styles.subtitle}>{ subtitle }</label>
          )
        }
      </div>
    </div>
  );
}

export default MediaCard;