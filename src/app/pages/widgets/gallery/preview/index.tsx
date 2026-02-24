import React from 'react';

import Dialog from '@mui/material/Dialog';

import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import styles from './style.module.scss';

const PreviewModal = ({ open, data, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        root: styles.galleryImageModalRoot,
        paper: styles.galleryImageMuiPaper,
      }}
    >
      <div className={styles.galleryImagePreview}>
        {
          data && (
            <img
              src={data.src.large2x}
              alt={data.alt}
              className={styles.image}
            />
          )
        }
        <IconButton onClick={onClose} className={styles.closeButton}>
          <Close />
        </IconButton>
      </div>
    </Dialog>
  );
}

export default PreviewModal;
