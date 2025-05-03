import React, { useEffect } from 'react';

import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

import AddNewWineModal from '@pages/apps/wine-collection/app/components/modals/new-wine';
import WineTile from '@pages/apps/wine-collection/app/components/wine-tile';
import NoData from '@pages/apps/wine-collection/app/components/no-data';

import { useStore } from '@pages/apps/wine-collection/app/store';
import { useAppModal } from '@pages/apps/wine-collection/app/store/app-modal';

import styles from './style.module.scss';

const WineAppWineListPage = () => {
  const { user, actions, wineList } = useStore((store) => store);
  const { openModal, closeModal } = useAppModal((store) => store);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }
    const unsubscribe = actions.onSubscribeWineList([user.uid, 'wine-list']);

    return () => {
      unsubscribe();
    }
  }, [user?.uid, actions.onSubscribeWineList]);

  const onAddNewWine = () => {
    openModal({
      name: 'new-wine-modal',
      props: {
      },
      content: (
        <AddNewWineModal
          onSubmit={actions.onAddNewWine}
          onClose={() => closeModal('new-wine-modal')}
        />
      ),
    });
  };

  return (
    <div className={styles.wineAppWineListPage}>
      <div className={styles.header}>
        <Avatar src={user.photoURL} />
        <TextField
          label="Search"
          fullWidth
          size="small"
          slotProps={{
            input: {
              startAdornment: <SearchOutlinedIcon />
            }
          }}
        />
        <Button variant="outlined">
          <FilterAltIcon />
        </Button>
        <Button variant="contained" onClick={onAddNewWine}>
          <PostAddOutlinedIcon />
        </Button>
      </div>
      <div className={styles.body}>
        <ul className={styles.wineList}>
          {
            wineList?.map((item) => (
              <WineTile key={item.id} wine={item} />
            ))
          }
        </ul>
        {
          wineList && !wineList?.length && (
            <NoData
              title="No wine data"
              subtitle="You don't have saved wines yet"
            />
          )
        }
      </div>
    </div>
  )
};

export default WineAppWineListPage;