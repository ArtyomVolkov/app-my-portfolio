import React from "react";

import { mergeClassNames } from "@utils/common";

import styles from "../style.module.scss";

export type Color = "default" | "primary" | "secondary" | "danger" | "warning" | "info" | "success";
export type Variant = "solid" | "outlined" | "dashed" | "text" | "link";

type ButtonProps = {
  color?: Color;
  variant?: Variant;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  color = "default",
  variant = "solid",
  onClick,
  startIcon,
  endIcon,
  children,
  ...rest
}) => {
  return (
    <button
      className={mergeClassNames([
        styles.Button,
        styles[variant],
        styles[color],
      ])}
      onClick={onClick}
      {...rest}
    >
      {startIcon && startIcon}
      <span className={styles.label}>{children}</span>
      {endIcon && endIcon}
    </button>
  );
};

export default Button;
