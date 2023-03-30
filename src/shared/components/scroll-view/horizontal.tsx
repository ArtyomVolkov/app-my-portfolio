import React, { useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';

interface IScrollView {
  children: JSX.Element,
  gateWidth?: number,
  gradientColor?: string
  resetScrollPosition?: boolean
}

const ScrollViewGradient: React.FC<IScrollView> = ({ children, gateWidth = 40, resetScrollPosition , gradientColor }) => {
  const childrenRef = useRef(null);
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(onResizeChange);

    observer.observe(childrenRef.current);
    setBackground();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (childrenRef.current) {
      setScrollbarHeight(childrenRef.current.parentElement.offsetHeight - childrenRef.current.clientHeight);
    }
    if (childrenRef.current && resetScrollPosition) {
      childrenRef.current.scrollTo({ left: 0 });
    }
  }, [children]);

  const onResizeChange = () => {
    if (childrenRef.current) {
      setOpacity(childrenRef.current);
    }
  };

  const setOpacity = (containerEl) => {
    if (!containerEl || !leftBoxRef.current || !rightBoxRef.current) {
      return;
    }
    const { clientWidth, scrollLeft, scrollWidth} = containerEl;
    const scrollBottom = scrollWidth - clientWidth - scrollLeft;
    const leftBoxOpacity = scrollLeft > gateWidth ? 1 : (scrollLeft / gateWidth);
    const rightBoxOpacity = scrollBottom > gateWidth ? 1 : (scrollBottom / gateWidth);

    leftBoxRef.current.style.opacity = leftBoxOpacity;
    rightBoxRef.current.style.opacity = rightBoxOpacity;
  };

  const setBackground = () => {
    if (!leftBoxRef.current || !rightBoxRef.current) {
      return;
    }
    if (gradientColor) {
      leftBoxRef.current.style.background = `linear-gradient(to left, ${gradientColor}, rgba(255, 255, 255, 0))`;
      rightBoxRef.current.style.background = `linear-gradient(to left, rgba(255, 255, 255, 0), ${gradientColor})`;
      return;
    }
    const color = window.getComputedStyle(childrenRef.current)?.backgroundColor || 'rgba(255, 255, 255, 0)';
    leftBoxRef.current.style.background = `linear-gradient(to right, ${color}, rgba(255, 255, 255, 0))`;
    rightBoxRef.current.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0), ${color})`;
  }

  const onScroll = (e) => {
    setOpacity(e.currentTarget);
  };

  return (
    <div className={styles.scrollViewHorizontal}>
      <div
        className={styles.leftBox}
        ref={leftBoxRef}
        style={{
          width: gateWidth,
          height: `calc(100% - ${scrollbarHeight}px)`,
        }}
      />
      <div
        className={styles.children}
        onScroll={onScroll}
        ref={childrenRef}
      >
        { children }
      </div>
      <div
        className={styles.rightBox}
        ref={rightBoxRef}
        style={{
          width: gateWidth,
          height: `calc(100% - ${scrollbarHeight}px)`,
        }}
      />
    </div>
  );
}

export default ScrollViewGradient;
