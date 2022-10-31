import React from 'react';

import Main from '@components/main';
import ProfileTabs from '@pages/profile/tabs';

import './style.scss';

const ProfilePage = () => {
  return (
    <Main className="profile-page">
      <ProfileTabs />
    </Main>
  );
}

export default ProfilePage;
