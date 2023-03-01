import React, { useEffect } from 'react';
import { useUserData } from '@pages/widgets/media-player/widget/store';

const UserPage = () => {
  const { user } = useUserData();

  useEffect(() => {

  }, []);
  console.log(user);

  return (
    <p>
      User page
    </p>
  );
}

export default UserPage;
