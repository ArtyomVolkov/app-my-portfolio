import React from 'react';

import Chat from './components/chat';
import ChatList from './components/chat-list';
import ChatDetails from './components/details';

import styles from './style.module.scss';

const ChatWidget = () => {
  return (
    <div className={styles.chatAppWidget}>
      <div className={styles.content}>
        <ChatList />
        <Chat />
        <ChatDetails />
      </div>
    </div>
  );
};

export default ChatWidget;