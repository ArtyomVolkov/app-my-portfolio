import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import Chat from '@pages/apps/chat/app';

import { TECHNOLOGIES } from './data';

import styles from './style.module.scss';

const ChatApp = () => {
  return (
    <Main className={styles.chatApp}>
      <h3>Chat App</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <Chat />
    </Main>
  );
};

export default ChatApp;
