import React from 'react';

import { useStore } from '@pages/apps/chat/app/store';
import styles from './style.module.scss'

const ChatDetails = () => {
  const { actions } = useStore((store) => store);

  return (
    <section className={styles.chatDetails}>
      <button onClick={actions.onSignOut}>SignOut</button>
    </section>
  );
};

export default ChatDetails;