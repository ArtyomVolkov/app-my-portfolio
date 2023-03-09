import React from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

interface IMediaBanner {
  image: string,
  title: string,
  children?: Array<JSX.Element> | JSX.Element ,
  className?: string
}

const MediaBanner: React.FC<IMediaBanner> = ({ title, image, children, className }) => {
  return (
    <section className={mergeClassNames([styles.mediaBanner, className])}>
      <img src={image} className={styles.image} alt="Banner Image" />
      <div className={styles.captions}>
        <div className={styles.title}>
          <span>{ title }</span>
        </div>
        { children }
      </div>
    </section>
  );
}

export default MediaBanner;
