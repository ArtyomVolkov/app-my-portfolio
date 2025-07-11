import React, { useEffect } from 'react';

import ChatList from './components/chat-list';
import ChatDetails from './components/chat-details';
import AppModals from './components/modals';
import Snackbar from './components/snackbar';
import AuthProvider from './providers/auth';
import ChatProvider from './providers/chat';

import { useAppStore } from './store/app';

import styles from './style.module.scss';

const ChatWidget = () => {
  useEffect(() => {
    return () => {
      useAppStore.getState().cleanUp();
    }
  }, []);

  return (
    <div className={styles.chatAppWidget}>
      <div className={styles.content}>
        <AuthProvider>
          <ChatProvider>
            <ChatList />
            <ChatDetails />
          </ChatProvider>
        </AuthProvider>
      </div>
      <AppModals />
      <Snackbar/>
    </div>
  );
};

export default ChatWidget;