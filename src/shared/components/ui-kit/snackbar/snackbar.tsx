import React, { useEffect } from "react";

import Button from "@shared/components/ui-kit/button";
import { type SnackbarProps, type SnackbarStoreItem } from "./provider";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

const DefaultSettings = {
  duration: 3000,
};

const Snackbar: React.FC<SnackbarProps & SnackbarStoreItem> = ({
  message,
  autoHide = true,
  terminate = false,
  duration = DefaultSettings.duration,
  onClose,
  onRequestClose,
}) => {
  const timerId = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoHide) {
      return;
    }
    timerId.current = setTimeout(handleClose, duration);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [autoHide, duration]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    onRequestClose();
  };

  return (
    <div
      className={mergeClassNames([
        styles.Snackbar,
        terminate && styles.terminate,
      ])}
    >
      <div className={styles.message}>{message}</div>
      <Button
        className={styles.closeButton}
        variant="link"
        onClick={handleClose}
      >
        ×
      </Button>
    </div>
  );
};

export default Snackbar;
