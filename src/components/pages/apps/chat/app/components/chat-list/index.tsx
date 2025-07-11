import React, { useEffect } from 'react';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import Avatar from '../avatar';
import TextInput from '../text-input';
import SearchUserModal from '../modals/search-user';

import { mergeClassNames } from '@utils/common';

import { useAuthStore } from '../../store/auth';
import { useSnackbar } from '../../store/modal';
import { useChatStore } from '../../store/chat';

import styles from './style.module.scss';

const ChatList = () => {
  const snackbar = useSnackbar((store) => store);
  const user = useAuthStore((store) => store.user);
  const { chats, activeChatId, actions } =  useChatStore(store => store);

  useEffect(() => {
    const unsubscribe = actions.subscribeChatList();

    return () => {
      unsubscribe();
    }
  }, []);

  const openSearchUserModal = () => {
    snackbar.open({
      key: 'search-user',
      content: (
        <SearchUserModal
          onClose={() => snackbar.close('search-user')}
          onSearch={actions.onSearchUser}
          onCreateChat={actions.onCreateChat}
        />
      )
    })
  };

  const onSelectChat = (e) => {
    actions.setActiveChat(e.currentTarget.dataset.chatid);
  };

  const renderChatList = () => {
    if (!chats.data && chats.loading) {
      return (
        <>
          {
            Array(7).fill(0).map((item,index) => (
              <li
                key={index}
                className={mergeClassNames([styles.chatItem, styles.skeleton])}
              >
                <span className={styles.avatar} />
                <div className={styles.details}>
                  <span className={styles.name} />
                  <span className={styles.lastMessage} />
                </div>
              </li>
            ))
          }
        </>
      )
    }
    if (chats.data?.length > 0) {
      return (
        chats.data.map((item) => (
          <li
            key={item.chatId}
            data-chatid={item.chatId}
            onClick={onSelectChat}
            className={mergeClassNames([styles.chatItem, activeChatId === item.chatId && styles.active])}
          >
            <Avatar url={item.user.photoURL} className={styles.avatar}/>
            <div className={styles.details}>
              <span className={styles.name}>{item.user.displayName || item.user.email}</span>
              <span className={styles.lastMessage}>{item.lastMessage}</span>
            </div>
          </li>
        ))
      )
    }
    return null;
  };

  return (
    <section className={styles.chatList}>
      <div className={styles.header}>
        <div className={styles.userDetails}>
          <div className={styles.user}>
            <Avatar url={user.photoURL} />
            <span className={styles.name}>{user.displayName || user.email}</span>
          </div>
          <div className={styles.actions}>
            <MoreVertRoundedIcon />
          </div>
        </div>
        <div className={styles.searchBox}>
          <TextInput placeholder="Search..." />
          <AddRoundedIcon className={styles.addIcon} onClick={openSearchUserModal}/>
        </div>
      </div>
      <div className={styles.body}>
        <ul className={styles.chats}>
          {
            renderChatList()
          }
        </ul>
      </div>
    </section>
  );
};

export default ChatList;