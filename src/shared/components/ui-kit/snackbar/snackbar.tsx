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
  color = "default",
  terminate = false,
  classes,
  duration = DefaultSettings.duration,
  onClose,
  onRequestClose,
}) => {
  const timerId = React.useRef<number | null>(null);

  useEffect(() => {
    if (!autoHide) {
      return;
    }
    timerId.current = window.setTimeout(handleClose, duration);

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
        styles[color],
        classes?.root,
      ])}
    >
      <div className={mergeClassNames([styles.message, classes?.message])}>
        {message}
      </div>
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
