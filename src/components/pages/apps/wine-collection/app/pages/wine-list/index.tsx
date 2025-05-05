import React, { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

import AddNewWineModal from '@pages/apps/wine-collection/app/components/modals/new-wine';
import WineTile from '@pages/apps/wine-collection/app/components/wine-tile';
import NoData from '@pages/apps/wine-collection/app/components/no-data';

import { useStore } from '@pages/apps/wine-collection/app/store';
import { useAppModal } from '@pages/apps/wine-collection/app/store/app-modal';

import styles from './style.module.scss';

const WineAppWineListPage = () => {
  const navigation = useNavigate();
  const { user, actions, wineList } = useStore((store) => store);
  const { openModal, closeModal } = useAppModal((store) => store);
  const inputSearchRef = useRef(null);

  const filteredList = useMemo(() => {
    if (!wineList.search) {
      return wineList.data;
    }
    return wineList.data?.filter((item) => {
      return item.fullName.trim().toLowerCase().includes(wineList.search.trim().toLowerCase())
        || item.brand.trim().toLowerCase().includes(wineList.search.trim().toLowerCase());
    });
  }, [wineList.search, wineList.data]);

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

  const onChangeSearchTerm = (e) => {
    actions.onSearchWine(e.target.value);
  };

  const onClearSearchTerm = () => {
    actions.onSearchWine('');
    inputSearchRef.current.focus();
  };

  const renderNoData = () => {
    const noResults = wineList.search && !filteredList?.length;

    if (wineList.loading || !noResults) {
      return null;
    }

    return (
      <NoData
        title={noResults ? "No results" : "No wine data"}
        subtitle={noResults
          ? "Sorry we couldn't find any results, try to clear filters or change search term."
          : "You don't have saved wines yet"}
      />
    )
  };

  const renderWineList = () => {
    if (!filteredList) {
      return null;
    }
    return filteredList.length > 0 && (
      <ul className={styles.wineList}>
        {
          filteredList.map((item) => (
            <WineTile key={item.id} wine={item} />
          ))
        }
      </ul>
    );
  };

  const renderSkeleton = () => {
    if (!wineList.loading) {
      return null;
    }
    return !wineList.data && (
      <div className={styles.skeleton}>
        <ul className={styles.wineList}>
          {Array(8).fill(0).map((item, index) => (
            <li key={index} className={styles.tile} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.wineAppWineListPage}>
      <div className={styles.header}>
        <Avatar
          src={user.photoURL}
          className={styles.avatar}
          onClick={() => navigation('user')}
        />
        <TextField
          label="Search"
          fullWidth
          size="small"
          value={wineList.search || ''}
          onChange={onChangeSearchTerm}
          inputRef={inputSearchRef}
          slotProps={{
            input: {
              startAdornment: <SearchOutlinedIcon className={styles.searchIcon} />,
              endAdornment: wineList.search
                ? <CloseRoundedIcon className={styles.clearIcon} onClick={onClearSearchTerm} />
                : null
            }
          }}
        />
        <div className={styles.actions}>
          <Button variant="outlined" color="inherit">
            <FilterAltIcon />
          </Button>
          <Button variant="contained" onClick={onAddNewWine}>
            <PostAddOutlinedIcon />
          </Button>
          <span className={styles.divider} />
          <Button variant="outlined" color="inherit" onClick={actions.onDownloadWineList}>
            <FileDownloadRoundedIcon />
          </Button>
          <Button variant="outlined" color="inherit" onClick={actions.onUploadWineList}>
            <FileUploadRoundedIcon />
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        {renderWineList()}
        {renderSkeleton()}
        {renderNoData()}
      </div>
    </div>
  )
};

export default WineAppWineListPage;