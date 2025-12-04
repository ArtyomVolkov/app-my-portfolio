import React from "react";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type ScrollViewProps = {
  children: React.ReactNode;
  horizontal?: boolean;
  withShadow?: boolean;
  boxShadowHeight?: number;
  className?: string;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};

const ScrollView: React.FC<ScrollViewProps> = ({
  children,
  horizontal = false,
  withShadow = true,
  boxShadowHeight = 40,
  className,
  onScroll,
}) => {
  const topShadowRef = React.useRef<HTMLDivElement>(null);
  const bottomShadowRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (onScroll) {
      onScroll(e);
    }
    if (!withShadow || !topShadowRef.current || !bottomShadowRef.current) {
      return;
    }
    const target = e.target as HTMLDivElement;
    const scrollValue = horizontal ? target.scrollLeft : target.scrollTop;

    const scrollWidth = horizontal ? target.scrollWidth : target.scrollHeight;
    const clientHeight = horizontal ? target.clientWidth : target.clientHeight;
    const scrollPosition = scrollWidth - clientHeight - scrollValue;
    const topOpacity =
      scrollValue > boxShadowHeight
        ? 1
        : Math.min(scrollValue / boxShadowHeight, 1);
    const bottomOpacity =
      scrollPosition > boxShadowHeight
        ? 1
        : Math.min(scrollPosition / boxShadowHeight, 1);

    topShadowRef.current.style.opacity = topOpacity.toString();
    bottomShadowRef.current.style.opacity = bottomOpacity.toString();
  };

  return (
    <div
      className={mergeClassNames([
        styles.ScrollView,
        horizontal && styles.horizontal,
        className,
      ])}
    >
      {withShadow && (
        <>
          <div
            ref={topShadowRef}
            className={styles.topShadow}
            style={{
              width: horizontal ? `${boxShadowHeight}px` : "100%",
              height: horizontal ? "100%" : `${boxShadowHeight}px`,
            }}
          />
          <div
            ref={bottomShadowRef}
            className={styles.bottomShadow}
            style={{
              width: horizontal ? `${boxShadowHeight}px` : "100%",
              height: horizontal ? "100%" : `${boxShadowHeight}px`,
            }}
          />
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
