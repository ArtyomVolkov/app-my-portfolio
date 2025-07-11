import React from 'react';

import Chat from './chat';
import ChatInfo from './info';

import { useChatStore } from '../../store/chat';

import styles from './style.module.scss';

const ChatDetails = () => {
  const activeChatId =  useChatStore(store => store.activeChatId);

  if (!activeChatId) {
    return (
      <div className={styles.chatAppDetailsPlaceholder}>
        <section className={styles.messageBox}>
          <span className={styles.title}>Select user chat to see the details</span>
          <span className={styles.subtitle}>If you dont have any chats - just create it</span>
          <button>Create chat</button>
        </section>
      </div>
    )
  }

  return (
    <>
      <Chat />
      <ChatInfo />
    </>
  )
};

export default ChatDetails;