import React from 'react';

import Dialog from '@mui/material/Dialog';

import './style.scss';

const PreviewModal = ({ open, data, onClose }) => {
  console.log(data);
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
      </div>
    </Dialog>
  );
}

export default PreviewModal;
