import React from 'react';

import IconButton from '@mui/material/IconButton';
import ArrowRight from '@mui/icons-material/KeyboardArrowRightRounded';

import Avatar from '@components/aside/avatar';
import Navigation from '@components/aside/navigation';

import Image from '@assets/images/a.volkov.png';

import STORE from '@store/app';

import './style.scss';

const SideBar = ({ fullWidth }) => {
  return (
    <aside>
      <Avatar
        title="Artem Volkov"
        subtitle="SR. FrontEnd engineer"
        image={Image}
      />
      <IconButton className="screen-resize" onClick={STORE.toggleFullWidth}>
        <ArrowRight className={!fullWidth ? 'icon left' : 'icon'} />
      </IconButton>
      <Navigation />
    </aside>
  );
};

export default SideBar;
