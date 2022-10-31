import React from 'react';

import Avatar from '@shared/components/avatar';
import Navigation from '@components/aside/navigation';

import Image from '@assets/images/a.volkov.png';

import './style.scss';

const SideBar = () => {
  return (
    <aside>
      <Avatar
        title="Artem Volkov"
        subtitle="SR. FrontEnd engineer"
        image={Image}
      />
      <Navigation />
    </aside>
  );
};

export default SideBar;
