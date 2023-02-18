import React from 'react';

import Main from '@components/main';
import ProfileTabs from '@pages/profile/tabs';

import styles from './style.module.scss';

const ProfilePage = () => {
  return (
    <Main className={styles.profilePage}>
      <ProfileTabs />
    </Main>
  );
}

export default ProfilePage;
