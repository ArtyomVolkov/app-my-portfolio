import { createPortal } from 'react-dom';
import { useState, useEffect, useRef } from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

export type Placement =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
  | 'left-start'
  | 'left-center'
  | 'left-end'
  | 'right-start'
  | 'right-center'
  | 'right-end';

type VerticalPlacement = 'top' | 'bottom' | 'left' | 'right';
type HorizontalPlacement = 'start' | 'center' | 'end';

type TooltipProps = {
  children: React.ReactNode;
  message: string | React.ReactNode;
  placement?: Placement;
  offset?: number;
  classes?: {
    tooltip?: string;
    popup?: string;
  };
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  message,
  placement = 'top-center',
  offset = 5,
  classes = {},
}) => {
  const [open, setOpen] = useState(false);
  const [terminate, setTerminate] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      setOpen(false);
      tooltipRef.current = null;
    };
  }, []);

  useEffect(() => {
    const rect: DOMRect | undefined =
      tooltipRef.current?.getBoundingClientRect();

    if (!rect || !popupRef.current || !open) {
      return;
    }
    const [vertical, horizontal] = placement.split('-');

    const styleLayout = getStyleLayout(
      rect,
      popupRef.current,
      vertical as VerticalPlacement,
      horizontal as HorizontalPlacement,
      offset
    );

    popupRef.current?.setAttribute('style', styleLayout);
  }, [offset, placement, open]);

  const getStyleLayout = (
    rect: DOMRect,
    popup: HTMLDivElement,
    vertical: VerticalPlacement,
    horizontal: HorizontalPlacement,
    offset: number = 0
  ) => {
    const styleLayout = [];

    if (vertical === 'top') {
      let [translateX, translateY] = ['0', '-100%'];
      let left = rect.left;

      // (check vertical overflow): top - offset - popup height < 0
      if (rect.top - offset - popup.offsetHeight < 0) {
        translateY = `${rect.height + offset * 2}px`;
      }
      if (horizontal === 'center') {
        left = rect.left + rect.width / 2;
        translateX = '-50%';
      }
      if (horizontal === 'end') {
        left = rect.right;
        translateX = '-100%';
      }
      styleLayout.push(`top: ${rect.top - offset}px`);
      styleLayout.push(`left: ${left}px`);
      styleLayout.push(
        `transform: translateY(${translateY}) translateX(${translateX})`
      );
    }

    if (vertical === 'bottom') {
      let [translateX, translateY] = ['0', '0'];
      let left = rect.left;

      // (check vertical overflow): bottom + offset + popup height > window.innerHeight
      if (rect.bottom + offset + popup.offsetHeight > window.innerHeight) {
        translateY = `-${rect.height + popup.offsetHeight + offset * 2}px`;
      }
      if (horizontal === 'center') {
        left = rect.left + rect.width / 2;
        translateX = '-50%';
      }
      if (horizontal === 'end') {
        left = rect.right;
        translateX = '-100%';
      }
      styleLayout.push(`top: ${rect.bottom + offset}px`);
      styleLayout.push(`left: ${left}px`);
      styleLayout.push(
        `transform: translateY(${translateY}) translateX(${translateX})`
      );
    }

    if (vertical === 'left') {
      let [translateX, translateY] = ['-100%', '-50%'];
      let top = rect.top + rect.height / 2;

      if (horizontal === 'start') {
        top = rect.top;
        translateY = '0';
      }
      if (horizontal === 'end') {
        top = rect.bottom;
        translateY = '-100%';
      }
      // (check vertical overflow): left + offset + popup width > viewport width
      if (popup.offsetWidth + offset > rect.left) {
        translateX = `${rect.width + offset * 2}px`;
      }
      styleLayout.push(`top: ${top}px`);
      styleLayout.push(`left: ${rect.left - offset}px`);
      styleLayout.push(
        `transform: translateY(${translateY}) translateX(${translateX})`
      );
    }

    if (vertical === 'right') {
      let [translateX, translateY] = ['0', '-50%'];
      let top = rect.top + rect.height / 2;

      if (horizontal === 'start') {
        top = rect.top;
        translateY = '0';
      }
      if (horizontal === 'end') {
        top = rect.bottom;
        translateY = '-100%';
      }
      // (check vertical overflow): right + offset + popup width > viewport width
      if (rect.right + offset + popup.offsetWidth > window.innerWidth) {
        translateX = `-${popup.offsetWidth + rect.width + offset * 2}px`;
      }

      styleLayout.push(`top: ${top}px`);
      styleLayout.push(`left: ${rect.right + offset}px`);
      styleLayout.push(
        `transform: translateY(${translateY}) translateX(${translateX})`
      );
    }

    return styleLayout.join(';');
  };

  const onMouseEnter = () => {
    setOpen(true);
  };

  const onMouseLeave = () => {
    setTerminate(true);
  };

  const onAnimationEnd = () => {
    if (terminate) {
      setOpen(false);
      setTerminate(false);
    }
  };

  return (
    <div
      ref={tooltipRef}
      className={mergeClassNames([styles.Tooltip, classes.tooltip])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {open &&
        createPortal(
          <div
            ref={popupRef}
            onAnimationEnd={onAnimationEnd}
            className={mergeClassNames([
              styles.TooltipPopup,
              styles[placement],
              classes.popup,
              terminate ? styles.closed : styles.open,
            ])}
          >
            {message || 'Tooltip message'}
          </div>,
          document.body,
          'tooltip-portal'
        )}
    </div>
  );
};

export default Tooltip;
