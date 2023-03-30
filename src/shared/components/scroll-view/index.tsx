import React, { useEffect, useMemo, useRef } from 'react';

import styles from './style.module.scss';

interface IScrollView {
  children: JSX.Element,
  gateHeight?: number,
  gradientColor?: string
  resetScrollPosition?: boolean
}

const ScrollViewGradient: React.FC<IScrollView> = ({ children, gateHeight = 40, resetScrollPosition , gradientColor }) => {
  const childrenRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  const scrollBarWidth = useMemo(() => {
    if (!childrenRef.current) {
      return 0;
    }
    return childrenRef.current.parentElement.offsetWidth - childrenRef.current.offsetWidth;
  }, [childrenRef.current]);

  useEffect(() => {
    const observer = new ResizeObserver(onResizeChange);

    observer.observe(childrenRef.current);
    setBackground();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (childrenRef.current && resetScrollPosition) {
      childrenRef.current.scrollTo({ top: 0 });
    }
  }, [children]);

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

  const setBackground = () => {
    if (!headerRef.current || !footerRef.current) {
      return;
    }
    if (gradientColor) {
      headerRef.current.style.background = `linear-gradient(${gradientColor}, rgba(255, 255, 255, 0))`;
      footerRef.current.style.background = `linear-gradient(rgba(255, 255, 255, 0), ${gradientColor})`;
      return;
    }
    const color = window.getComputedStyle(childrenRef.current)?.backgroundColor || 'rgba(255, 255, 255, 0)';
    headerRef.current.style.background = `linear-gradient(${color}, rgba(255, 255, 255, 0))`;
    footerRef.current.style.background = `linear-gradient(rgba(255, 255, 255, 0), ${color})`;
  }

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
        }}
      />
    </div>
  );
}

export default ScrollViewGradient;
