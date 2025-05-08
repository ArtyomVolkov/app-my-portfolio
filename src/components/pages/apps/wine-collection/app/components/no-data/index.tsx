import React from 'react';

import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';

import styles from './style.module.scss';

interface INodata {
  title?: string|JSX.Element,
  subtitle?: string|JSX.Element,
  content?: JSX.Element
}

const NoData: React.FC<INodata> = ({ title = 'No Data', subtitle = '', content }) => {
  return (
    <section className={styles.wineAppNoData}>
      <ContentPasteSearchOutlinedIcon className={styles.icon} />
      <span className={styles.title}>{title}</span>
      <span className={styles.subtitle}>{subtitle}</span>
      {content}
    </section>
  )
};

export default NoData;