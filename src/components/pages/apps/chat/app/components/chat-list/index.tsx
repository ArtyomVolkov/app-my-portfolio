import React, { useEffect } from 'react';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { mergeClassNames } from '@utils/common';

import { useStore } from '../../store';

import styles from './style.module.scss';

const MOCK_DATA = {
  list: Array(20).fill(1)
    .map((item, index) => ({ name: `User ${index+1}`, lastMessage: 'Some text...'}))
};

const ChatList = () => {
  const { actions, chats } = useStore((store) => store);

  useEffect(() => {
    const unsubscribe = actions.subscribeChatsChanged();

    return () => {
      unsubscribe();
    }
  }, []);
  //
  console.log(chats);

  return (
    <section className={styles.chatList}>
      <div className={styles.header}>
        <div className={styles.userDetails}>
          <div className={styles.user}>
            <div className={styles.avatar}>U</div>
            <span className={styles.name}>User</span>
          </div>
          <div className={styles.actions}>
            <MoreVertRoundedIcon />
          </div>
        </div>
        <div className={styles.searchBox}>
          <div className={styles.input} >
            <input placeholder="search..." />
          </div>
          <AddRoundedIcon className={styles.addIcon}/>
        </div>
      </div>
      <div className={styles.body}>
        <ul className={styles.chats}>
          {
            chats.map((item, index) => (
              <li
                key={item.name}
                className={mergeClassNames([styles.chatItem, index === 3 && styles.active])}
              >
                <div className={styles.avatar}>Ur</div>
                <div className={styles.details}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.lastMessage}>{item.lastMessage}</span>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
};

export default ChatList;