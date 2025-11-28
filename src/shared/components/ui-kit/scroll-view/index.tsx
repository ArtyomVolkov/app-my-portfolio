import React from "react";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type ScrollViewProps = {
  children: React.ReactNode;
  horizontal?: boolean;
  withShadow?: boolean;
  className?: string;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};

const ScrollView: React.FC<ScrollViewProps> = ({
  children,
  horizontal = false,
  withShadow = true,
  className,
  onScroll,
}) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (onScroll) {
        onScroll(e);
    }
    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    const atTop = scrollTop === 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
    
    console.log(scrollTop);
  };

  return (
    <div
      className={mergeClassNames([
        styles.ScrollView,
        horizontal && styles.horizontal,
      ])}
    >
      {withShadow && (
        <>
          <div className={styles.topShadow} />
          <div className={styles.bottomShadow} />
        </>
      )}
      <div
        className={mergeClassNames([styles.content, className])}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollView;
