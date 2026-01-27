import React, { useEffect } from "react";

import Button from "@shared/components/ui-kit/button";
import { type SnackbarProps } from "./provider";

import styles from "./style.module.scss";

const Snackbar: React.FC<SnackbarProps & { onRequestClose: () => void }> = ({
  message,
  autoHide = true,
  onClose,
  onRequestClose,
}) => {
  const timerId = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoHide) {
      return;
    }
    timerId.current = setTimeout(handleClose, 3000);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [autoHide]);

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
    <div className={styles.Snackbar}>
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
