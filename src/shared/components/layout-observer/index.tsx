import { useRef } from 'react';
import { useResizeChange } from '@shared/hooks/layout';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import Button from '@shared/components/ui-kit/button';
import Typography from '@shared/components/ui-kit/typography';
import appModal from '@shared/components/ui-kit/modal';

import styles from './style.module.scss';

type LayoutObserverProps = {
  minWidth: number;
  children: React.ReactNode;
  className?: string;
};

const LayoutObserver: React.FC<LayoutObserverProps> = ({
  children,
  minWidth,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasNotified = useRef({ value: false });

  const onChangeResize = () => {
    if (!containerRef.current || hasNotified.current.value) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const contentWidth = rect.width;

    if (contentWidth > minWidth) {
      appModal.close('layoutWarning');
      return;
    }
    if (appModal.isOpen('layoutWarning')) {
      return;
    }
    appModal.open('layoutWarning', {
      movable: true,
      header: (
        <div className={styles.header}>
          <span>Screen Too Small</span>
        </div>
      ),
      classes: {
        root: styles.LayoutObserverModal,
        modalBox: styles.modalBox,
      },
      body: (
        <div className={styles.body}>
          <DotLottieReact
            className={styles.lottie}
            src={'./assets/lottie/screen-size.lottie'}
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
          >{`The application is best viewed on screens wider than ${minWidth}px.`}</Typography>
          <Typography variant="p" lineBreak>
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

  useResizeChange(onChangeResize);

  const onConfirm = () => {
    hasNotified.current.value = true;
    appModal.close('layoutWarning');
  };

  const onClose = () => {
    appModal.close('layoutWarning');
  };

  return (
    <div
      className={className}
      ref={containerRef}
      style={{ minWidth: `${minWidth}px` }}
    >
      {children}
    </div>
  );
};

export default LayoutObserver;
