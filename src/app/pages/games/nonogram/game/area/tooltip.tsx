import React from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

interface ITooltip {
  tooltipRef: React.Ref<any>
}
const Tooltip: React.FC<ITooltip> = ({ tooltipRef }) => (
  <div className={mergeClassNames([styles.tooltip, styles.hidden])} ref={tooltipRef} />
);

export default Tooltip;