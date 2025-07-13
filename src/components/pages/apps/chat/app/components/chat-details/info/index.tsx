import React, { useMemo } from 'react';

import Avatar from '@pages/apps/chat/app/components/avatar';
import Button from '@pages/apps/chat/app/components/button';
import Divider from '@shared/components/divider';

import { useAuthStore } from '../../../store/auth';
import { useChatStore } from '../../../store/chat';

import { dateFormat, mergeClassNames } from '@utils/common';

import styles from './style.module.scss'

const ChatDetails = () => {
  const chat = useChatStore((store) => store.chat);
  const actions = useAuthStore((store) => store.actions);

  const media = useMemo(() => {
    if (!chat.data) {
      return [];
    }
    return chat.data.messages.filter((item) => item.image)
  }, [chat.data]);

  const renderContent = () => {
    if (chat.loading) {
      return (
        <>
          <div className={mergeClassNames([styles.userInfo, styles.skeleton])}>
            <span className={styles.avatar} />
            <span className={styles.creator} />
            <span className={styles.date} />
          </div>
          <div className={mergeClassNames([styles.settings, styles.skeleton])}>
            <span className={styles.title} />
            <div className={styles.grid}>
              {
                Array(5).fill(0).map((item, index) => (
                  <span className={styles.cell} key={index} />
                ))
              }
            </div>
          </div>
          <div className={mergeClassNames([styles.actions, styles.skeleton])}>
            <span className={styles.button} />
          </div>
        </>
      )
    }
    if (chat.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <Avatar
              size={100}
              url={chat.data.user.photoURL}
              className={styles.avatar}
            />
            <span className={styles.creator}>{chat.data.user.email}</span>
            <span className={styles.date}>{dateFormat(chat.data.createdAt)}</span>
          </div>
          <div className={styles.settings}>
            {
              media.length > 0 && (
                <>
                  <Divider classes={{ title: styles.title }} title="Attachments" />
                  <div className={styles.grid}>
                    {
                      media.map((item) => (
                        <div key={item.image} className={styles.cell}>
                          <img src={item.image} alt="image" />
                        </div>
                      ))
                    }
                  </div>
                </>
              )
            }
          </div>
          <div className={styles.actions}>
            <Button onClick={actions.onSignOut} text="Sign Out" className={styles.button}/>
          </div>
        </>
      )
    }
    return null;
  }

  return (
    <section className={styles.chatAppDetails}>
      {renderContent()}
    </section>
  );
};

export default ChatDetails;