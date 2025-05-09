import React from 'react';

import styles from './style.module.scss';

const Chat = () => {
  return (
    <section className={styles.chat}>
      <div className={styles.header}>Header</div>
      <div className={styles.main}>Main</div>
      <div className={styles.footer}>footer</div>
    </section>
  );
};

export default Chat;