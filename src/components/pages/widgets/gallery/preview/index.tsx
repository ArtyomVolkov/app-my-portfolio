import React from 'react';

import Dialog from '@mui/material/Dialog';

import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

import './style.scss';

const PreviewModal = ({ open, data, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        root: 'galleryImageModalRoot',
        paper: 'galleryImageMuiPaper',
      }}
    >
      <div className="gallery-image-preview">
        {
          data && (
            <img
              src={data.src.large2x}
              alt={data.alt}
            />
          )
        }
        <IconButton onClick={onClose} className="close-button">
          <Close />
        </IconButton>
      </div>
    </Dialog>
  );
}

export default PreviewModal;
