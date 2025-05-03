import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useAppModal } from '@pages/apps/wine-collection/app/store/app-modal';

const AppModal = () => {
  const modals = useAppModal((state) => state.modals);

  return (
    <>
      {
        modals.map((item) => (
          <Dialog
            key={item.name}
            open={item.open}
            scroll="paper"
            {...item.props}
          >
            {item.content}
          </Dialog>
        ))
      }
    </>
  );
}

export default AppModal;