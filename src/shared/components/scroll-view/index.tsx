import React, { useEffect, useMemo, useRef } from 'react';

import styles from './style.module.scss';

interface IScrollView {
  children: JSX.Element,
  gateHeight?: number,
  gradientColor?: string
}

const ScrollViewGradient: React.FC<IScrollView> = ({ children, gateHeight = 40, gradientColor }) => {
  const childrenRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  const parentColor = useMemo(() => {
    if (gradientColor) {
      return gradientColor;
    }
    if (!childrenRef.current) {
      return 'rgba(255, 255, 255, 0)';
    }
    // inherit background color from parent view
    return window.getComputedStyle(childrenRef.current)?.backgroundColor;
  }, [childrenRef.current]);

  const scrollBarWidth = useMemo(() => {
    if (!childrenRef.current) {
      return 0;
    }
    return childrenRef.current.parentElement.offsetWidth - childrenRef.current.offsetWidth;
  }, [childrenRef.current]);

  useEffect(() => {
    const observer = new ResizeObserver(onResizeChange);

    observer.observe(childrenRef.current);

    return () => observer.disconnect();
  }, []);

  const onResizeChange = () => {
    if (!childrenRef.current) {
      return
    }
    setOpacity(childrenRef.current);
  };

  const setOpacity = (containerEl) => {
    if (!containerEl || !headerRef.current || !footerRef.current) {
      return;
    }
    const { clientHeight, scrollTop, scrollHeight} = containerEl;
    const scrollBottom = scrollHeight - clientHeight - scrollTop;
    const headerOpacity = scrollTop > gateHeight ? 1 : (scrollTop / gateHeight);
    const bottomOpacity = scrollBottom > gateHeight ? 1 : (scrollBottom / gateHeight);

    headerRef.current.style.opacity = headerOpacity;
    footerRef.current.style.opacity = bottomOpacity;
  };

  const onScroll = (e) => {
    setOpacity(e.currentTarget);
  };

  return (
    <div className={styles.scrollView}>
      <div
        className={styles.header}
        ref={headerRef}
        style={{
          height: gateHeight,
          width: `calc(100% - ${scrollBarWidth}px)`,
          background: `linear-gradient(${parentColor}, rgba(255, 255, 255, 0))`
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
        className={styles.footer}
        ref={footerRef}
        style={{
          height: gateHeight,
          width: `calc(100% - ${scrollBarWidth}px)`,
          background: `linear-gradient(rgba(255, 255, 255, 0), ${parentColor})`
        }}
      />
    </div>
  );
}

export default ScrollViewGradient;
