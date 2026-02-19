import React, { ReactNode } from 'react';

import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';

import styles from './style.module.scss';

interface INodata {
  title?: string|ReactNode,
  subtitle?: string|ReactNode,
  content?: ReactNode
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