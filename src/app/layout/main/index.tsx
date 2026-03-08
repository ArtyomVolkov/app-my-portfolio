import React, { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import Button from '@shared/components/ui-kit/button';
import Typography from '@shared/components/ui-kit/typography';
import appModal from '@shared/components/ui-kit/modal';

import { mergeClassNames } from '@utils/common';
import { DEBOUNCE_DELAY } from '@shared/constants/commons';

import styles from './style.module.scss';

type MainProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string | null;
  useLayoutObserver?: boolean;
};

const Main: React.FC<MainProps> = ({
  children,
  className = null,
  useLayoutObserver = true,
}) => {
  const mainRef = useRef<HTMLElement>(null);
  const hasNotified = useRef({ value: false });

  useEffect(() => {
    if (!useLayoutObserver) {
      return;
    }
    const resizeObserver = new ResizeObserver(onChangeResizeDebounce);

    if (mainRef.current) {
      resizeObserver.observe(mainRef.current);
    }
    return () => {
      if (mainRef.current) {
        resizeObserver.unobserve(mainRef.current);
      }
    };
  }, [useLayoutObserver]);

  const onChangeResize = () => {
    if (!mainRef.current || hasNotified.current.value) {
      return;
    }
    const hasHorizontalScrollBar = mainRef.current
      ? mainRef.current.scrollWidth > mainRef.current.clientWidth
      : false;

    if (!hasHorizontalScrollBar) {
      appModal.close('layoutWarning');
      return;
    }
    if (appModal.isOpen('layoutWarning')) {
      return;
    }
    const minContentWidth =
      mainRef.current.scrollWidth +
      mainRef.current.offsetWidth -
      mainRef.current.clientWidth;

    appModal.open('layoutWarning', {
      movable: true,
      header: (
        <div className={styles.header}>
          <span>Screen Too Small!</span>
        </div>
      ),
      classes: {
        root: styles.LayoutWarningModal,
        modalBox: styles.modalBox,
      },
      body: (
        <div className={styles.body}>
          <DotLottieReact
            className={styles.lottie}
            src={'/assets/lottie/screen-size.lottie'}
            width={300}
            height={140}
            renderConfig={{
              devicePixelRatio: 2,
            }}
            layout={{
              fit: 'fit-height',
            }}
            autoplay
            loop
          />
          <Typography
            variant="h5"
            className={styles.title}
            lineBreak
          >{`The application is best viewed on screens wider than ${minContentWidth}px.`}</Typography>
          <Typography variant="p" lineBreak className={styles.description}>
            Adaptive layout for current screen size hasn't been implemented yet.
          </Typography>
          <div className={styles.actions}>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" color="primary" onClick={onConfirm}>
              Got it
            </Button>
          </div>
        </div>
      ),
    });
  };

  const onChangeResizeDebounce = debounce(onChangeResize, DEBOUNCE_DELAY);

  const onConfirm = () => {
    hasNotified.current.value = true;
    appModal.close('layoutWarning');
  };

  const onClose = () => {
    appModal.close('layoutWarning');
  };

  return (
    <main ref={mainRef} className={mergeClassNames([styles.main, className])}>
      {children}
    </main>
  );
};

export default Main;
