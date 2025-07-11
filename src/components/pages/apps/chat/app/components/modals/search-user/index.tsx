import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import TextInput from '../../text-input';
import Avatar from '../../avatar';
import Loader from '../../loaders/circular';

import { dateFormat, mergeClassNames } from '@utils/common';
import { SearchUser } from '../../../types/user';

import { useSnackbar } from '../../../store/snackbar';

import styles from './style.module.scss';

type SearchUserModalProps = {
  onClose: () => void;
  onSearch: (email: string) => Promise<SearchUser|null>,
  onCreateChat: (user: SearchUser) => Promise<string|void>
}

const SearchUserModal: React.FC<SearchUserModalProps> = ({ onClose, onSearch, onCreateChat }) => {
  const { open } = useSnackbar((store) => store);
  const [loading, setLoading] = useState({
    search: false,
    create: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  const onSearchUser = async (email: string) => {
    if (!email.trim().length) {
      setUser(null);
      return;
    }
    setLoading({
      ...loading,
      search: true
    });
    const user = await onSearch(email.trim());
    setUser(user);
    setLoading({
      ...loading,
      search: false
    });
  };

  const onSearchUserDebounce = useCallback(
    debounce(onSearchUser, 500, { leading: true, trailing: true }),
    [debounce]
  );

  const onChangeInput = (e) => {
    setSearchTerm(e.target.value);
    onSearchUserDebounce(e.target.value);
  };

  const onAddUserToChat = async () => {
    setLoading({ ...loading, create: true });
    const error = await onCreateChat(user);
    setLoading({ ...loading, create: false });

    open({
      key: 'createUserChat',
      variant: error ? 'error' : 'success',
      closeButton: true,
      autoHide: error ? null : 3000,
      content: (
        <span>{!error ? 'Chat successfully created' : error}</span>
      )
    });
    onClose();
  };

  const renderSearchResult = () => {
    if (loading.search) {
      return (
        <div className={styles.skeleton}>
          <div className={styles.avatar} />
          <div className={styles.userInfo}>
            <span className={styles.createdAt} />
            <span className={styles.userName} />
          </div>
          <div className={styles.addUser} />
        </div>
      )
    }
    if (!user) {
      return (
        <div className={styles.noData}>
          <span>{!searchTerm.trim().length ? `Input the user's email to find it.` : 'User not found'}</span>
        </div>
      )
    }
    return (
      <div className={mergeClassNames([styles.user, loading.create && styles.loading])}>
        <Avatar url={user.image} size={40} className={styles.avatar} />
        <div className={styles.userInfo}>
          <span className={styles.createdAt}>{dateFormat(user.createdAt)}</span>
          <span className={styles.userName}>{user.name}</span>
        </div>
        <div className={styles.addUser} onClick={onAddUserToChat}>
          {
            loading.create ? <Loader /> : <AddRoundedIcon />
          }
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatAppSearchUserModal}>
      <div className={styles.header}>
        <span className={styles.title}>Search user</span>
        <span className={styles.close} role="button" onClick={onClose}>✖</span>
      </div>
      <div className={styles.body}>
        <TextInput
          placeholder="Email"
          classes={{ root: styles.searchInput}}
          onChange={onChangeInput}
        />
        <div className={styles.searchResult}>
          {renderSearchResult()}
        </div>
      </div>
    </div>
  );
};

export default SearchUserModal;