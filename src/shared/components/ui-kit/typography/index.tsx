import React from "react";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

const Tag = ({ name, children, ...rest }) => {
  return React.createElement(name, { ...rest }, children);
};

export type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type TypographyProps = {
  className?: string;
  variant?: Variant;
  lineNumber?: 1 | 2 | 3;
  children?: React.ReactNode | string;
};

const Typography: React.FC<TypographyProps> = ({
  className,
  children,
  variant = "h3",
  lineNumber = 1,
}) => {
  return (
    <Tag
      name={variant}
      className={mergeClassNames([
        styles.Typography,
        styles[variant],
        lineNumber && styles[`line-${lineNumber}`],
        className,
      ])}
    >
      {children}
    </Tag>
  );
};

export default Typography;
