import React from "react";

import { mergeClassNames } from "@utils/common";

import Spinner from "../spinner";

import styles from "./style.module.scss";

export type Color =
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "info"
  | "success";
export type Variant = "solid" | "outlined" | "dashed" | "text" | "link";

type ButtonProps = {
  color?: Color;
  variant?: Variant;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  color = "default",
  variant = "solid",
  loading = false,
  onClick,
  startIcon,
  endIcon,
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={mergeClassNames([
        styles.Button,
        styles[variant],
        styles[color],
        loading && styles.loading,
        className,
      ])}
      onClick={onClick}
      {...rest}
    >
      {startIcon && startIcon}
      <span className={styles.text}>{children}</span>
      {loading && <Spinner className={styles.spinner} />}
      {endIcon && endIcon}
    </button>
  );
};

export default Button;
