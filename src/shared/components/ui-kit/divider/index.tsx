import React, { useMemo } from "react";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type DividerProps = {
  title?: string;
  height?: number;
  align?: "left" | "center" | "right";
  borderStyle?: "solid" | "dashed" | "dotted";
  className?: string;
};

const Divider: React.FC<DividerProps> = ({
  title,
  height = 2,
  align = "center",
  borderStyle = "solid",
  className,
}) => {
  const borderRadius = useMemo(
    () => (borderStyle === "solid" ? height / 2 : 0),
    [height, borderStyle]
  );
  return (
    <div
      className={mergeClassNames([
        styles.Divider,
        styles[`align-${align}`],
        className,
      ])}
    >
      <hr
        className={styles.hrLeft}
        style={{
          borderTopWidth: height,
          borderRadius,
          borderStyle,
        }}
      />
      {title && <span className={styles.title}>{title}</span>}
      <hr
        className={styles.hrRight}
        style={{
          borderTopWidth: height,
          borderRadius,
          borderStyle,
        }}
      />
    </div>
  );
};

export default Divider;
