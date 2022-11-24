import React from 'react';

import IconButton from '@mui/material/IconButton';
import ArrowLeft from '@mui/icons-material/ArrowBackRounded';
import ArrowRight from '@mui/icons-material/ArrowForwardRounded';

import Avatar from '@components/aside/avatar';
import Navigation from '@components/aside/navigation';

import appActions from '@store/actions/app';
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
      <IconButton className="screen-resize" onClick={appActions.toggleFullWidth}>
        <ArrowLeft />
      </IconButton>
      <Navigation />
    </aside>
  );
};

export default SideBar;
