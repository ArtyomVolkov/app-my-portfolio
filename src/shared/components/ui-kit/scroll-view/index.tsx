import React, { useEffect, useLayoutEffect, useRef } from "react";

import { debounce } from "lodash";
import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type ScrollViewProps = {
  children: React.ReactNode;
  horizontal?: boolean;
  withShadow?: boolean;
  boxShadowHeight?: number;
  classes?: {
    root?: string;
    content?: string;
  };
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};

const ScrollView: React.FC<ScrollViewProps> = ({
  children,
  horizontal = false,
  withShadow = true,
  boxShadowHeight = 40,
  classes,
  onScroll,
}) => {
  const scrollViewRef = useRef<HTMLDivElement>(null);
  const topShadowRef = useRef<HTMLDivElement>(null);
  const bottomShadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!withShadow || !scrollViewRef.current) {
      return;
    }
    const observer = new ResizeObserver(onChangeContentSizeDebounced);
    observer.observe(scrollViewRef.current);

    return () => {
      observer.disconnect();
    };
  }, [withShadow]);

  const onChangeContentSize = () => {
    if (!scrollViewRef.current || !bottomShadowRef.current) {
      return;
    }
    const scrollWidth = horizontal
      ? scrollViewRef.current!.scrollWidth
      : scrollViewRef.current!.scrollHeight;
    const clientHeight = horizontal
      ? scrollViewRef.current!.clientWidth
      : scrollViewRef.current!.clientHeight;

    bottomShadowRef.current!.style.opacity =
      scrollWidth > clientHeight ? "1" : "0";
  };

  const onChangeContentSizeDebounced = debounce(onChangeContentSize, 100);

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
        classes?.root,
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
        className={mergeClassNames([styles.content, classes?.content])}
        onScroll={handleScroll}
        ref={scrollViewRef}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollView;
