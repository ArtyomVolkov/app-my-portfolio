import React, { useEffect, useRef } from 'react';

import Avatar from '../../../components/avatar';
import ChatFooter from './footer';

import { useChatStore } from '../../../store/chat';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Chat = () => {
  const anchorRef = useRef(null);
  const { activeChatId, chat, actions } = useChatStore((store) => store);

  useEffect(() => {
    if (!activeChatId) {
      return;
    }
    const unsubscribe = actions.subscribeActiveChat(activeChatId);

    return () => {
      unsubscribe();
    }
  }, [activeChatId]);

  useEffect(() => {
    if (!anchorRef?.current || !chat.data.messages.length) {
      return;
    }
    anchorRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat.data]);

  const renderChatContent = () => {
    if (chat.loading) {
      return (
        <>
          <div className={mergeClassNames([styles.header, styles.skeleton])}>
            <span className={styles.avatar} />
            <div className={styles.details}>
              <span className={styles.name} />
              <span className={styles.lastMessage}/>
            </div>
          </div>
          <div className={mergeClassNames([styles.messages, styles.skeleton])}>
            {
              Array(10).fill(0).map((item, index) => (
                <div className={mergeClassNames([styles.message, !(index % 2) && styles.author])} key={index}>
                  <span className={styles.avatar} />
                  <span className={styles.text} />
                </div>
              ))
            }
          </div>
          <ChatFooter className={styles.skeleton} />
        </>
      )
    }
    if (chat.data) {
      return (
        <>
          <div className={styles.header}>
            <Avatar url={chat.data.user.photoURL} />
            <div className={styles.details}>
              <span className={styles.name}>{chat.data.user.displayName || chat.data.user.email}</span>
              <span className={styles.lastMessage}>{chat.data.lastMessage}</span>
            </div>
          </div>
          <div className={styles.messages}>
            {
              chat.data.messages.map((item) => (
                <div
                  key={item.createdAt}
                  className={mergeClassNames([
                    styles.message,
                    item.sender !== chat.data.user.email && styles.author
                  ])}
                >
                  <Avatar className={styles.avatar} url={item.avatar} size={24} />
                  <span className={styles.text}>
                    {item.image && <img src={item.image} alt="image" className={styles.image} />}
                    <span>{item.text}</span>
                  </span>
                </div>
              ))
            }
            <div className={styles.anchor} ref={anchorRef} />
          </div>
         <ChatFooter chatId={chat.data?.chatId} />
        </>
      )
    }
    return null
  }

  return (
    <section className={styles.chat}>
      {renderChatContent()}
    </section>
  );
};

export default Chat;