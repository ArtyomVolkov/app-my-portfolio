import React, { useState } from 'react';

import Button from '@mui/material/Button';

import styles from './style.module.scss'

const DeleteWineModal = ({ data, onConfirm, onClose }) => {
  const [submitting, setSubmitting] = useState(false);

  const onDeleteConfirm = async () => {
    setSubmitting(true);
    await onConfirm(data.id);
    setSubmitting(false);
  }

  return (
    <div className={styles.wineAppDeleteWineModal}>
      <div className={styles.header}>
        <span className={styles.title}>Delete wine?</span>
      </div>
      <div className={styles.body}>
        <span>Permanently delete wine? You can't undo this.</span>
      </div>
      <div className={styles.actions}>
        <Button variant="outlined" onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" loading={submitting} onClick={onDeleteConfirm}>Delete</Button>
      </div>
    </div>
  );
};

export default DeleteWineModal;