import React from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

type TagProps = {
  name: string;
  children?: React.ReactNode | string;
  [key: string]: any;
};

const Tag: React.FC<TagProps> = ({ name, children, ...rest }) => {
  return React.createElement(name, { ...rest }, children);
};

export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type TypographyProps = {
  className?: string;
  variant?: Variant;
  lineNumber?: 1 | 2 | 3;
  lineBreak?: boolean;
  children?: React.ReactNode | string;
};

const Typography: React.FC<TypographyProps> = ({
  className,
  children,
  variant = 'h3',
  lineBreak = false,
  lineNumber = 1,
}) => {
  return (
    <Tag
      name={variant}
      className={mergeClassNames([
        styles.Typography,
        styles[variant],
        lineNumber && styles[`line-${lineNumber}`],
        lineBreak && styles.lineBreak,
        className,
      ])}
    >
      {children}
    </Tag>
  );
};

export default Typography;
