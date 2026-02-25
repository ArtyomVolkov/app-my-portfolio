import type React from 'react';

import styles from './style.module.scss';

type LoaderProps = {
  title?: string;
};

const Loader: React.FC<LoaderProps> = ({ title = 'Loading...' }) => {
  return (
    <div className={styles.Loader}>
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default Loader;
