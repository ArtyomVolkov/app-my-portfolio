import React from "react";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type SpinnerProps = {
  circleCount?: number;
  duration?: number;
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({
  circleCount = 10,
  duration = 1,
  className,
}) => {
  return (
    <div className={mergeClassNames([styles.Spinner, className])}>
      <div className={styles.plainCircle}>
        {[...Array(circleCount)].map((_, index) => (
          <span
            key={index}
            className={styles.circle}
            style={{
              transform: `rotate(${(index / circleCount) * 360}deg)`,
            }}
          >
            <span
              className={styles.point}
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${(duration / 10) * (index + 1)}s`,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Spinner;
